import React from 'react';
import './MatchCard.css';

function MatchHistory({
  matchId,
  matchData: { player1, player2, winner},
}) {

  return (
    <div className=" w-96 h-20 mb-6 flex justify-center items-center rounded-xl bg-gradient-to-br from-[#323e45] to-[#1b1e1f] text-white">
      <div className="players-info ">

        <div className="player-block">
          <div className={`css_history player-name ${(player1 == winner) ? "css_winner" : "css_loser"}`}>{player1}</div>
        </div>

        <div className="vs">VS</div>

        <div className="player-block">
          <div className={`css_history player-name ${(player1 == winner) ? "css_winner" : "css_loser"}`}>{player2}</div>
        </div>
      </div>
    </div>
  );
}

export default MatchHistory;