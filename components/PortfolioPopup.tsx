import React from 'react';
import { PortfolioSection } from '../types';

interface PortfolioPopupProps {
  section: PortfolioSection;
  onClose: () => void;
  isLastSection: boolean;
}

const PortfolioPopup: React.FC<PortfolioPopupProps> = ({ section, onClose, isLastSection }) => {
  return (
    <div className="relative w-full max-w-3xl bg-black border-4 border-double border-retro-green p-2 shadow-[0_0_20px_rgba(0,255,0,0.3)] animate-[fadeIn_0.3s_ease-out]">
      {/* Header Bar */}
      <div className="bg-retro-green text-black p-3 flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl md:text-3xl font-retro tracking-widest">{section.title}</h2>
        <button 
          onClick={onClose}
          className="border-2 border-black px-3 py-1 text-xl hover:bg-black hover:text-retro-green transition-colors font-bold"
        >
          X
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 max-h-[70vh] overflow-y-auto font-retro text-retro-green">
        {section.content}
      </div>

      {/* Footer Instructions */}
      <div className="p-4 border-t-2 border-retro-green/30 text-center mt-4">
        <p className="text-lg md:text-xl opacity-80 blink">
          {isLastSection ? 'ALL DATA RECOVERED' : 'PRESS CLOSE TO RESUME MISSION'}
        </p>
      </div>
    </div>
  );
};

export default PortfolioPopup;