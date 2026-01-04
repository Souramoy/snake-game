import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { GameState, Point, Food, FoodType } from '../types';
import { 
  SNAKE_SPEED, 
  MOBILE_SNAKE_SPEED,
  SNAKE_SIZE, 
  FOOD_SIZE, 
  SPECIAL_FOOD_SIZE,
  THEME_COLOR,
  BG_COLOR,
  INITIAL_LENGTH,
  FOOD_TO_TRIGGER_SPECIAL,
  SEGMENT_DISTANCE
} from '../constants';
import { resolveSnakeMovement, checkSelfCollision, getDistance, getRandomPosition } from '../utils/gameUtils';

export interface SnakeCanvasRef {
  setDirection: (x: number, y: number) => void;
}

interface SnakeCanvasProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  score: number;
  setScore: (score: number | ((prev: number) => number)) => void;
  foodsEaten: number;
  setFoodsEaten: (count: number | ((prev: number) => number)) => void;
  onSpecialFoodEaten: () => void;
  isLastOrb: boolean;
}

const SnakeCanvas = forwardRef<SnakeCanvasRef, SnakeCanvasProps>(({
  gameState,
  setGameState,
  setScore,
  foodsEaten,
  setFoodsEaten,
  onSpecialFoodEaten,
  isLastOrb
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Mutable Game State
  const snakeRef = useRef<Point[]>([]);
  // Direction: {x: 0, y: -1} is Up.
  const directionRef = useRef<Point>({ x: 1, y: 0 }); 
  const nextDirectionRef = useRef<Point>({ x: 1, y: 0 }); // Buffer to prevent double-turn bugs
  
  const foodsRef = useRef<Food[]>([]);
  const foodCounterRef = useRef<number>(0);
  const particlesRef = useRef<{pos: Point, life: number, vel: Point}[]>([]);

  // Expose control method to parent
  useImperativeHandle(ref, () => ({
    setDirection: (x: number, y: number) => {
      const currentDir = directionRef.current;
      // Prevent reversing into self
      if (x !== 0 && currentDir.x === 0) nextDirectionRef.current = { x, y: 0 };
      if (y !== 0 && currentDir.y === 0) nextDirectionRef.current = { x: 0, y };
    }
  }));

  // Initialize Game Logic
  const initGame = useCallback(() => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    
    // Center snake
    const centerX = width / 2;
    const centerY = height / 2;
    
    snakeRef.current = Array.from({ length: INITIAL_LENGTH }).map((_, i) => ({
      x: centerX - (i * SEGMENT_DISTANCE), // Body extends left
      y: centerY
    }));
    
    directionRef.current = { x: 1, y: 0 }; // Moving Right
    nextDirectionRef.current = { x: 1, y: 0 };

    foodsRef.current = [];
    spawnFood(width, height, FoodType.NORMAL);
    foodCounterRef.current = 0;
    particlesRef.current = [];
  }, []);

  const spawnFood = (width: number, height: number, type: FoodType) => {
    const margin = 50;
    const newFood: Food = {
      position: getRandomPosition(width, height, margin),
      type,
      id: Date.now() + Math.random()
    };
    foodsRef.current.push(newFood);
  };

  const createParticles = (x: number, y: number, color: string) => {
    for(let i=0; i<8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3;
        particlesRef.current.push({
            pos: {x, y},
            life: 1.0,
            vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }
        });
    }
  };

  // Keyboard Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== GameState.PLAYING) return;
      
      const currentDir = directionRef.current;
      
      switch(e.key) {
        case 'ArrowUp':
          if (currentDir.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (currentDir.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (currentDir.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (currentDir.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Main Game Loop
  const update = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (gameState === GameState.PLAYING) {
      // Update Direction from buffer
      directionRef.current = nextDirectionRef.current;

      // Determine Speed based on screen width
      const currentSpeed = window.innerWidth < 1024 ? MOBILE_SNAKE_SPEED : SNAKE_SPEED;

      // 1. Move Snake
      snakeRef.current = resolveSnakeMovement(
        snakeRef.current,
        directionRef.current,
        currentSpeed
      );

      // 2. Wall Collision (Soft Wrap)
      const head = snakeRef.current[0];
      if (head.x < 0) head.x = canvas.width;
      if (head.x > canvas.width) head.x = 0;
      if (head.y < 0) head.y = canvas.height;
      if (head.y > canvas.height) head.y = 0;

      // 3. Self Collision
      if (checkSelfCollision(snakeRef.current)) {
        setGameState(GameState.GAME_OVER);
        return; 
      }

      // 4. Check Food Collision
      const eatenIndex = foodsRef.current.findIndex(f => {
        const dist = getDistance(head, f.position);
        const threshold = f.type === FoodType.SPECIAL ? SPECIAL_FOOD_SIZE + SNAKE_SIZE : FOOD_SIZE + SNAKE_SIZE;
        return dist < threshold;
      });

      if (eatenIndex !== -1) {
        const eatenFood = foodsRef.current[eatenIndex];
        foodsRef.current.splice(eatenIndex, 1);
        
        createParticles(eatenFood.position.x, eatenFood.position.y, THEME_COLOR);

        if (eatenFood.type === FoodType.SPECIAL) {
           onSpecialFoodEaten();
           spawnFood(canvas.width, canvas.height, FoodType.NORMAL);
        } else {
          setScore(s => s + 10);
          setFoodsEaten(f => {
              const newCount = f + 1;
              foodCounterRef.current = newCount;
              return newCount;
          });
          
          const tail = snakeRef.current[snakeRef.current.length - 1];
          snakeRef.current.push({ ...tail });

          if ((foodCounterRef.current + 1) % FOOD_TO_TRIGGER_SPECIAL === 0) {
              spawnFood(canvas.width, canvas.height, FoodType.SPECIAL);
          } else {
              spawnFood(canvas.width, canvas.height, FoodType.NORMAL);
          }
        }
      }
    }

    // --- RENDER ---
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#003300';
    for (let x = 0; x < canvas.width; x += 40) {
        for(let y=0; y < canvas.height; y+= 40) {
            ctx.fillRect(x, y, 1, 1);
        }
    }

    ctx.fillStyle = THEME_COLOR;
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.pos.x += p.vel.x;
        p.pos.y += p.vel.y;
        p.life -= 0.05;
        
        if (p.life <= 0) {
            particlesRef.current.splice(i, 1);
        } else {
            ctx.globalAlpha = p.life;
            ctx.fillRect(p.pos.x, p.pos.y, 2, 2);
            ctx.globalAlpha = 1.0;
        }
    }

    foodsRef.current.forEach(f => {
      ctx.beginPath();
      if (f.type === FoodType.SPECIAL) {
        if (isLastOrb) {
           // Flashing RED effect for final orb
           const time = Date.now();
           const isFlash = Math.floor(time / 200) % 2 === 0;
           ctx.fillStyle = isFlash ? '#ff0000' : '#ffffff';
           ctx.shadowColor = '#ff0000';
           ctx.shadowBlur = 20;
           ctx.arc(f.position.x, f.position.y, SPECIAL_FOOD_SIZE/2, 0, Math.PI * 2);
           ctx.fill();

           // Draw "END" Text
           ctx.fillStyle = isFlash ? '#ff0000' : '#ffffff';
           ctx.font = 'bold 16px "VT323", monospace';
           ctx.textAlign = 'center';
           ctx.textBaseline = 'bottom';
           ctx.shadowBlur = 0;
           ctx.fillText("END", f.position.x, f.position.y - 12);
        } else {
           // Normal Special Orb (White)
           ctx.fillStyle = '#ffffff';
           ctx.shadowBlur = 15;
           ctx.shadowColor = THEME_COLOR;
           ctx.arc(f.position.x, f.position.y, SPECIAL_FOOD_SIZE/2, 0, Math.PI * 2);
           ctx.fill();
        }
      } else {
        ctx.fillStyle = THEME_COLOR;
        ctx.shadowBlur = 5;
        ctx.shadowColor = THEME_COLOR;
        ctx.arc(f.position.x, f.position.y, FOOD_SIZE/2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    });

    ctx.fillStyle = THEME_COLOR;
    snakeRef.current.forEach((segment, i) => {
       ctx.beginPath();
       const size = i === 0 ? SNAKE_SIZE : SNAKE_SIZE - 2;
       ctx.arc(segment.x, segment.y, size/2, 0, Math.PI * 2);
       ctx.fill();
    });
    
    if (snakeRef.current.length > 0) {
        ctx.strokeStyle = THEME_COLOR;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(snakeRef.current[0].x, snakeRef.current[0].y);
        for(let i=1; i<snakeRef.current.length; i++) {
            ctx.lineTo(snakeRef.current[i].x, snakeRef.current[i].y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    }

    requestRef.current = requestAnimationFrame(update);
  }, [gameState, onSpecialFoodEaten, setFoodsEaten, setGameState, setScore, isLastOrb]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        
        // Initialize if we are on Menu OR if snake is empty (happens on fresh restart mount)
        if (gameState === GameState.MENU || snakeRef.current.length === 0) {
             initGame();
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState, initGame]);

  useEffect(() => {
    // We don't need to initGame here because handleResize does it on mount
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [update]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="block cursor-none"
      />
    </div>
  );
});

export default SnakeCanvas;