
import React from 'react';
import './MatchCard.css';
import { motion } from "framer-motion";


function MatchCard({
  matchId,
  matchData: { player1, player2, isReadyP1, isReadyP2 },
  onReady,  
  onStartMatch
}) {
  const bothReady = isReadyP1 && isReadyP2;

  const handleReady = (playerKey) => {
    onReady(matchId, playerKey);
  };

  return (
    <div className='h-52 flex duration-200 transition-all flex-col justify-center items-center gap-5'>

    <div className=" w-96 h-32  flex justify-center items-center rounded-2xl bg-gradient-to-br from-[#323e45] to-[#1b1e1f] text-white">
      <div className="flex items-center">

        <div className="player-block">
          <div className="player-name">{player1}</div>
          <button 
              className={`py-2 w-24 rounded-xl border border-white/30 duration-200 transition-all flex gap-3 items-center justify-center focus:outline-none active:outline-none 
                ${isReadyP1 ? 'active:bg-[#5E97A9] hover:border-[#5E97A9]' : ''}`}
            onClick={() => handleReady('player1')}
          >
            {isReadyP1 ? 'Ready' : 'Join'}
          </button>
        </div>

        <div className="vs">VS</div>

        <div className="player-block">
          <button 
            className={`py-2 w-24 rounded-xl border border-white/30 duration-200 transition-all flex gap-3 items-center justify-center focus:outline-none active:outline-none 
              ${isReadyP2 ? 'active:bg-[#5E97A9] hover:border-[#5E97A9]' : ''}`}
            onClick={() => handleReady('player2')}
          >
            {isReadyP2 ? 'Ready' : 'Join'}
          </button>
          <div className="player-name">{player2}</div>
        </div>
      </div>
    </div>
      <div >
      
      {bothReady && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0., ease: 'anticipate' }}
          className='rounded-xl py-2 w-32 text-white border border-white/30 duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none'
          onClick={() => onStartMatch(matchId)}
        >
          Start Match
        </motion.button>
)}
        
      </div>
    </div>
  );
}

export default MatchCard;

