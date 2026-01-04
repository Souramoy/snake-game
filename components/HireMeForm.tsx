import React, { useState } from 'react';

interface HireMeFormProps {
  score: number;
  onRestart: () => void;
}

const HireMeForm: React.FC<HireMeFormProps> = ({ score, onRestart }) => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');
    // Simulate API call
    setTimeout(() => {
      setStatus('SENT');
      console.log('Hire request sent! (Simulation)');
    }, 1500);
  };

  if (status === 'SENT') {
    return (
      <div className="text-center animate-pulse w-full max-w-2xl bg-black border-4 border-retro-green p-8">
        <h2 className="text-4xl mb-6 text-retro-green">MESSAGE TRANSMITTED</h2>
        <p className="mb-8 text-2xl">We will be in touch shortly.</p>
        <button
          onClick={onRestart}
          className="border-2 border-retro-green bg-retro-darkGreen px-8 py-3 text-2xl text-retro-green hover:bg-retro-green hover:text-black transition-colors"
        >
          INSERT COIN TO RESTART
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-black border-4 border-retro-green p-8 relative">
      <div className="absolute -top-5 left-6 bg-black px-4 text-retro-green text-xl border border-retro-green">
        GAME OVER - SCORE: {score}
      </div>
      
      <h2 className="text-4xl mb-8 text-center text-retro-green text-glow mt-4">CONTINUE? / HIRE ME</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg uppercase mb-2 opacity-80">Player Name</label>
          <input
            required
            type="text"
            className="w-full bg-black border-2 border-retro-green p-3 text-xl text-retro-green focus:outline-none focus:ring-1 focus:ring-retro-green"
            placeholder="Recruiter Name"
          />
        </div>
        <div>
          <label className="block text-lg uppercase mb-2 opacity-80">Contact Frequency</label>
          <input
            required
            type="email"
            className="w-full bg-black border-2 border-retro-green p-3 text-xl text-retro-green focus:outline-none focus:ring-1 focus:ring-retro-green"
            placeholder="email@company.com"
          />
        </div>
        <div>
          <label className="block text-lg uppercase mb-2 opacity-80">Mission Details</label>
          <textarea
            required
            rows={4}
            className="w-full bg-black border-2 border-retro-green p-3 text-xl text-retro-green focus:outline-none focus:ring-1 focus:ring-retro-green"
            placeholder="I have a job opportunity..."
          ></textarea>
        </div>

        <div className="flex gap-6 pt-4">
           <button
            type="button"
             onClick={onRestart}
            className="flex-1 border-2 border-retro-green py-3 text-xl hover:bg-retro-green hover:text-black transition-colors"
          >
            RESTART GAME
          </button>
          <button
            type="submit"
            disabled={status === 'SENDING'}
            className="flex-1 bg-retro-green text-black font-bold py-3 text-xl hover:bg-white transition-colors"
          >
            {status === 'SENDING' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
         <a href="#" className="text-lg underline opacity-60 hover:opacity-100">DOWNLOAD RESUME.PDF</a>
      </div>
    </div>
  );
};

export default HireMeForm;