import React from 'react';
import './MatchCard.css';

function MatchHistory({
  matchId,
  matchData: { player1, player2, winner},
}) {

  return (
    <div className="match-card">
      <div className="players-info">

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