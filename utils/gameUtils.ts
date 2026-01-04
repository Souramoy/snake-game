import { Point, Food, FoodType } from '../types';
import { SEGMENT_DISTANCE } from '../constants';

export const getDistance = (p1: Point, p2: Point): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const normalizeVector = (p: Point): Point => {
  const len = Math.sqrt(p.x * p.x + p.y * p.y);
  if (len === 0) return { x: 0, y: 0 };
  return { x: p.x / len, y: p.y / len };
};

export const getRandomPosition = (width: number, height: number, padding: number): Point => {
  return {
    x: padding + Math.random() * (width - padding * 2),
    y: padding + Math.random() * (height - padding * 2),
  };
};

// Updated for Keyboard Control (Orthogonal Movement)
export const resolveSnakeMovement = (
  snake: Point[],
  direction: Point, // Now represents normalized velocity {x: 0, y: -1} etc
  speed: number
): Point[] => {
  const newSnake = [...snake];
  const head = newSnake[0];

  // Move Head based on current direction and speed
  newSnake[0] = {
    x: head.x + direction.x * speed,
    y: head.y + direction.y * speed,
  };

  // Drag Body (Inverse Kinematics / Follow the Leader)
  // This keeps the smooth movement feel while constrained to 4 directions
  for (let i = 1; i < newSnake.length; i++) {
    const prev = newSnake[i - 1];
    const curr = newSnake[i];
    
    const segmentDist = getDistance(prev, curr);
    
    // If the segment is too far, pull it towards the previous one
    if (segmentDist > SEGMENT_DISTANCE) {
      const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x);
      newSnake[i] = {
        x: prev.x + Math.cos(angle) * SEGMENT_DISTANCE,
        y: prev.y + Math.sin(angle) * SEGMENT_DISTANCE,
      };
    }
  }

  return newSnake;
};

export const checkSelfCollision = (snake: Point[], gracePeriod: number = 10): boolean => {
  if (snake.length <= gracePeriod) return false;
  
  const head = snake[0];
  // Check against body parts
  for (let i = gracePeriod; i < snake.length; i++) {
    // Slightly smaller hitbox for self-collision to be forgiving
    if (getDistance(head, snake[i]) < SEGMENT_DISTANCE / 2) {
      return true;
    }
  }
  return false;
};