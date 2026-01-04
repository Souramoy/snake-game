import React from 'react';

export type Point = {
  x: number;
  y: number;
};

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  POPUP = 'POPUP',
  GAME_OVER = 'GAME_OVER'
}

export enum FoodType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL'
}

export interface Food {
  position: Point;
  type: FoodType;
  id: number;
}

export interface PortfolioSection {
  id: string;
  title: string;
  content: React.ReactNode;
}