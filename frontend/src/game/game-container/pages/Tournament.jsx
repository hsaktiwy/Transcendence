import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bracket } from 'react-brackets';
import MatchCard from '../components/MatchCard';
import './Tournament.css';
import './style.css';


function Tournament({ src }) {
  const navigate = useNavigate();

  const [Matches, setMatches] = useState({
    Semi_Final_1: {
      player1: 'PLY1',
      player2: 'PLY2',
      winner: null,
      isReadyP1: false,
      isReadyP2: false,
      thier_Turn: true,
    },
    Semi_Final_2: {
      player1: 'PLY3',
      player2: 'PLY4',
      winner: null,
      isReadyP3: false,
      isReadyP4: false,
      thier_Turn: false,
    },
    Final: {
      player1: 'TBD',
      player2: 'TBD',
      winner: null,
      isReadyF1: false,
      isReadyF2: false,
      thier_Turn: false,
    },
  });

  const handleReady = (matchId, whichPlayer) => {
    setMatches((prev) => {
      const newMatch = { ...prev[matchId] };
      if (whichPlayer === 'player1') {
        newMatch.isReadyP1 = !newMatch.isReadyP1;
      } else {
        newMatch.isReadyP2 = !newMatch.isReadyP2;
      }
      return {
        ...prev,
        [matchId]: newMatch,
      };
    });
  };

  const handleStartMatch = (matchId) => {
    console.log(`Starting match: ${matchId}`);
    navigate('/Localgame');
  };

  const rounds = [
    {
      title: 'Semi Finals',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { name: Matches.Semi_Final_1?.player1 || 'TBD' },
            { name: Matches.Semi_Final_1?.player2 || 'TBD' },
          ],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [
            { name: Matches.Semi_Final_2?.player1 || 'TBD' },
            { name: Matches.Semi_Final_2?.player2 || 'TBD' },
          ],
        },
      ],
    },
    {
      title: 'Final',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [
            { name: Matches.Final?.player1 || 'TBD' },
            { name: Matches.Final?.player2 || 'TBD' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="main-game-page-container">
      <div className="tournament-page">
        <div className="tournament-layout">
          <div className="bracket-section">
            <div className="bracket-display">
              <center>
                <Bracket rounds={rounds}/>
              </center>
            </div>
          </div>

          <div className="matches-section">
            <div className="matches-column">
              <h1 className="tournament-heading">MATCHES HISTORY</h1>
            </div>

            <div className="vertical-line"/>

            <div className="matches-column">
              <h1 className="tournament-heading">MATCHES QUEUE</h1>
              
              <MatchCard 
                matchId="Semi_Final_1"
                matchData={Matches.Semi_Final_1}
                onReady={handleReady}
                onStartMatch={handleStartMatch}
              />
              <MatchCard 
                matchId="Semi_Final_2"
                matchData={Matches.Semi_Final_2}
                onReady={handleReady}
                onStartMatch={handleStartMatch}
              />
              <MatchCard 
                matchId="Final"
                matchData={Matches.Final}
                onReady={handleReady}
                onStartMatch={handleStartMatch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournament;


 