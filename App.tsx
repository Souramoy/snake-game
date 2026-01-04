import React, { useState, useRef } from 'react';
import SnakeCanvas, { SnakeCanvasRef } from './components/SnakeCanvas';
import PortfolioPopup from './components/PortfolioPopup';
import HireMeForm from './components/HireMeForm';
import { GameState } from './types';
import { PORTFOLIO_SECTIONS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [score, setScore] = useState(0);
  const [foodsEaten, setFoodsEaten] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  // Used to force a full reset of the game component on restart
  const [gameId, setGameId] = useState(0);
  
  // Reference to control the snake directly from UI buttons
  const snakeRef = useRef<SnakeCanvasRef>(null);

  const startGame = () => {
    setGameId(prev => prev + 1); // Force remount of SnakeCanvas
    setGameState(GameState.PLAYING);
    setScore(0);
    setFoodsEaten(0);
    setSectionIndex(0);
  };

  const resumeGame = () => {
      setGameState(GameState.PLAYING);
  };

  const handleSpecialFood = () => {
    setGameState(GameState.POPUP);
  };

  const handlePopupClose = () => {
    setGameState(GameState.PLAYING);
    // Advance content
    setSectionIndex(prev => (prev + 1) % PORTFOLIO_SECTIONS.length);
  };

  // Mobile Control Handlers
  const handleMoveUp = () => snakeRef.current?.setDirection(0, -1);
  const handleMoveDown = () => snakeRef.current?.setDirection(0, 1);
  const handleMoveLeft = () => snakeRef.current?.setDirection(-1, 0);
  const handleMoveRight = () => snakeRef.current?.setDirection(1, 0);

  return (
    <div className="relative w-screen h-screen bg-retro-black font-retro overflow-hidden crt text-retro-green select-none">
      
      {/* Game Layer */}
      {/* key={gameId} ensures the component is completely destroyed and recreated on restart */}
      <SnakeCanvas 
        ref={snakeRef}
        key={gameId}
        gameState={gameState}
        setGameState={setGameState}
        score={score}
        setScore={setScore}
        foodsEaten={foodsEaten}
        setFoodsEaten={setFoodsEaten}
        onSpecialFoodEaten={handleSpecialFood}
        isLastOrb={sectionIndex === PORTFOLIO_SECTIONS.length - 1}
      />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-glow mb-1">SNAKE_OS v1.0</h1>
                <p className="text-xl md:text-2xl opacity-70">PORTFOLIO PROTOCOL</p>
            </div>
            <div className="text-right">
                <p className="text-2xl md:text-3xl">SCORE: {score.toString().padStart(6, '0')}</p>
                <p className="text-lg md:text-xl mt-1">SECTIONS: {sectionIndex}/{PORTFOLIO_SECTIONS.length}</p>
            </div>
        </div>
        
        <div className="text-center opacity-75 text-lg md:text-xl font-bold tracking-wider hidden lg:block">
            {gameState === GameState.PLAYING && "USE ARROW KEYS ⬆⬇⬅➡ TO MOVE • COLLECT DATA ORBS"}
        </div>
      </div>

      {/* Mobile Controls Layer (Visible on Mobile/Tablet) */}
      {gameState === GameState.PLAYING && (
        <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-auto lg:hidden opacity-80 touch-manipulation">
          {/* UP */}
          <button 
            className="w-16 h-16 bg-black/50 border-2 border-retro-green rounded-lg flex items-center justify-center text-3xl active:bg-retro-green active:text-black transition-colors"
            onPointerDown={(e) => { e.preventDefault(); handleMoveUp(); }}
          >
            ▲
          </button>
          
          <div className="flex gap-4">
            {/* LEFT */}
            <button 
              className="w-16 h-16 bg-black/50 border-2 border-retro-green rounded-lg flex items-center justify-center text-3xl active:bg-retro-green active:text-black transition-colors"
              onPointerDown={(e) => { e.preventDefault(); handleMoveLeft(); }}
            >
              ◀
            </button>
            
            {/* RIGHT */}
            <button 
              className="w-16 h-16 bg-black/50 border-2 border-retro-green rounded-lg flex items-center justify-center text-3xl active:bg-retro-green active:text-black transition-colors"
              onPointerDown={(e) => { e.preventDefault(); handleMoveRight(); }}
            >
              ▶
            </button>
          </div>
          
          {/* DOWN */}
          <button 
            className="w-16 h-16 bg-black/50 border-2 border-retro-green rounded-lg flex items-center justify-center text-3xl active:bg-retro-green active:text-black transition-colors"
            onPointerDown={(e) => { e.preventDefault(); handleMoveDown(); }}
          >
            ▼
          </button>
        </div>
      )}

      {/* Interactable Overlay Containers (Pointer events enabled on children) */}
      
      {/* MENU SCREEN */}
      {gameState === GameState.MENU && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center space-y-4 animate-pulse p-4">
            <h2 className="text-3xl md:text-5xl text-white font-bold tracking-widest text-glow mb-2">SOURAMOY SHEE</h2>
            <h1 className="text-7xl md:text-9xl text-retro-green text-glow mb-6">PORTFOLIO<br/>SNAKE</h1>
            <p className="max-w-2xl mx-auto mb-10 text-2xl md:text-3xl leading-relaxed">
              Use <span className="text-white border border-white px-1 mx-1">ARROWS</span> or <span className="text-white border border-white px-1 mx-1">BUTTONS</span> to control.<br/>
              Eat green dots to grow.<br/>
              Find <span className="text-white font-bold text-glow">White Glowing Orbs</span> to unlock profile data.
            </p>
            <button 
              onClick={startGame}
              className="px-10 py-4 border-4 border-retro-green bg-retro-darkGreen hover:bg-retro-green hover:text-black transition-all text-3xl font-bold tracking-widest pointer-events-auto"
            >
              INSERT COIN / START
            </button>
          </div>
        </div>
      )}

      {/* POPUP SCREEN */}
      {gameState === GameState.POPUP && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="pointer-events-auto">
             <PortfolioPopup 
                section={PORTFOLIO_SECTIONS[sectionIndex]} 
                onClose={handlePopupClose}
                isLastSection={sectionIndex === PORTFOLIO_SECTIONS.length - 1}
             />
           </div>
        </div>
      )}

      {/* GAME OVER SCREEN */}
      {gameState === GameState.GAME_OVER && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/95 p-4">
          <div className="pointer-events-auto w-full flex justify-center">
             <HireMeForm score={score} onRestart={startGame} />
          </div>
        </div>
      )}

    </div>
  );
};

export default App;