import React from 'react';
import { PortfolioSection } from './types';

// Visuals
export const THEME_COLOR = '#00ff00';
export const BG_COLOR = '#000000';
export const FONT_FAMILY = '"VT323", monospace';

// Game Mechanics
export const SNAKE_SPEED = 4.0; // Desktop speed
export const MOBILE_SNAKE_SPEED = 2.5; // Slower for mobile/tablet
export const TURN_SPEED = 0.15; // Unused in orthogonal mode but kept for reference
export const SEGMENT_DISTANCE = 12; 
export const SNAKE_SIZE = 10; // Slightly bigger visual
export const FOOD_SIZE = 8;
export const SPECIAL_FOOD_SIZE = 16;
export const INITIAL_LENGTH = 10;
export const FOOD_TO_TRIGGER_SPECIAL = 5;

// Portfolio Data
export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  {
    id: 'intro',
    title: 'PLAYER_ONE',
    content: (
      <div className="space-y-6 text-xl md:text-2xl">
        <h3 className="text-3xl md:text-4xl font-bold mb-2 text-glow">SOURAMOY SHEE</h3>
        <p className="leading-relaxed">Computer Science Student at AOT Hooghly | Tech Enthusiast | Aspiring Developer</p>
        <p className="leading-relaxed opacity-90">Passionate about solving code mysteries & Detective Movies Enthusiast. Eager to explore and contribute to the evolving tech landscape.</p>
        <div className="text-lg md:text-xl opacity-80 mt-4 border-t border-retro-green/50 pt-2 grid grid-cols-2 gap-2">
           <span>EXP: 5+ YEARS</span>
           <span>LOC: West Bengal, India</span>
        </div>
      </div>
    )
  },
  {
    id: 'skills',
    title: 'SKILL_TREE',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl md:text-2xl">
        <div>
          <h3 className="underline mb-4 text-2xl md:text-3xl font-bold">Development</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>React.js, Node.js, Fastn</li>
            <li>Android Studio (Java/XML)</li>
            <li>PHP & MySQL</li>
            <li>Mobile App Development</li>
          </ul>
        </div>
        <div>
          <h3 className="underline mb-4 text-2xl md:text-3xl font-bold">Concepts</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI & Machine Learning</li>
            <li>OOP & Software Design</li>
            <li>Team Leadership</li>
            <li>System Architecture</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'experience',
    title: 'CAMPAIGN_HISTORY',
    content: (
      <div className="space-y-8 text-lg md:text-xl">
        
        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-2xl text-glow">Sturtle Security Pvt Ltd.</h3>
            <span className="opacity-70 text-sm">Nov 23 - Mar 24</span>
          </div>
          <p className="italic mb-1">Web Dev Officer & Programmer Intern</p>
          <p className="opacity-90">Built a groundbreaking app reading PDFs/images as datasets for AI/OCR Q&A.</p>
        </div>

        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-2xl text-glow">Ardent Computech</h3>
            <span className="opacity-70 text-sm">Nov 23 - Dec 23</span>
          </div>
          <p className="italic mb-1">Android App Developer Intern</p>
          <p className="opacity-90">Spearheaded development of a fully functional online food delivery mobile app using Java & Android Studio.</p>
        </div>

        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-2xl text-glow">DH Technologies</h3>
            <span className="opacity-70 text-sm">Jan 23 - Feb 23</span>
          </div>
          <p className="italic mb-1">Backend Developer Intern</p>
          <p className="opacity-90">Developed robust backend functionalities for a food delivery web app using PHP & MySQL.</p>
        </div>

        <div className="border-t border-retro-green/30 pt-4 mt-4">
             <p><strong>Other Roles:</strong> Back-end Lead @ InnovateX, Technical Team Member @ IEI Students' Chapter.</p>
        </div>
      </div>
    )
  },
  {
    id: 'projects',
    title: 'MISSION_LOG',
    content: (
      <div className="space-y-4 text-lg md:text-xl">
        <p className="mb-4">Top classified projects retrieved from GitHub:</p>
        
        <a href="https://github.com/Souramoy/hotel_Grand_hotel" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">Hotel Grand Hotel</span>
          <span className="text-sm opacity-80">Full stack hospitality management system.</span>
        </a>

        <a href="https://github.com/Souramoy/farm-front" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">Farm Front</span>
          <span className="text-sm opacity-80">Agricultural tech solution frontend.</span>
        </a>

        <a href="https://github.com/Souramoy/Restaurant_BellaVista" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">Restaurant BellaVista</span>
          <span className="text-sm opacity-80">Restaurant website application.</span>
        </a>

         <a href="https://github.com/Souramoy/app-teacher" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">App Teacher</span>
          <span className="text-sm opacity-80">Educational utility application.</span>
        </a>

        <a href="https://github.com/Souramoy/lodgedigital_demo_2" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">Lodge Digital Demo</span>
          <span className="text-sm opacity-80">Lodge management digital demonstration.</span>
        </a>

        <a href="https://github.com/Souramoy/junior" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">Junior Project</span>
          <span className="text-sm opacity-80">Development resources and junior level apps.</span>
        </a>

        <a href="https://github.com/Souramoy/sccsecode" target="_blank" rel="noopener noreferrer" className="block border border-retro-green p-3 hover:bg-retro-green hover:text-black transition-colors">
          <span className="font-bold block text-xl">SCCSE Code</span>
          <span className="text-sm opacity-80">Coding repository & utilities.</span>
        </a>
      </div>
    )
  },
  {
    id: 'contact',
    title: 'TRANSMISSION',
    content: (
      <div className="space-y-6 text-xl md:text-2xl text-center">
        <p className="text-2xl md:text-3xl mb-4">ESTABLISH UPLINK?</p>
        
        <div className="space-y-3 flex flex-col items-center">
            <a href="https://about.souramoy.tech/" target="_blank" rel="noopener noreferrer" className="hover:bg-retro-green hover:text-black px-4 py-2 border border-retro-green w-full max-w-sm transition-colors">
                🌐 OFFICIAL WEBSITE
            </a>
            <a href="https://github.com/Souramoy" target="_blank" rel="noopener noreferrer" className="hover:bg-retro-green hover:text-black px-4 py-2 border border-retro-green w-full max-w-sm transition-colors">
                💻 GITHUB
            </a>
            <a href="https://instagram.com/soura_shee" target="_blank" rel="noopener noreferrer" className="hover:bg-retro-green hover:text-black px-4 py-2 border border-retro-green w-full max-w-sm transition-colors">
                📸 INSTAGRAM (@soura_shee)
            </a>
             <div className="border border-retro-green/50 px-4 py-2 w-full max-w-sm">
                📞 +91 6294516326
            </div>
        </div>

        <div className="pt-6">
          <p className="animate-pulse text-xl md:text-2xl font-bold opacity-80">&gt;&gt; END OF TRANSMISSION &lt;&lt;</p>
        </div>
      </div>
    )
  }
];