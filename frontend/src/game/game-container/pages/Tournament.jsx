import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bracket } from 'react-brackets';
import MatchCard from '../components/MatchCard';
import './Tournament.css';
import './style.css';
import { useLocalGamesContext } from '../game/MatchContext';
import { useEffect } from 'react';

function Tournament() {
  const navigate = useNavigate();
  const { LocalGamesData }    = useLocalGamesContext();
  const { setLocalGamesData } = useLocalGamesContext();

  
  useEffect( () => {
      if ( LocalGamesData.gametype !== 'Tournament'
        || LocalGamesData.player1 === null ||  LocalGamesData.player1 === undefined 
        || LocalGamesData.player2 === null ||  LocalGamesData.player2 === undefined  
        || LocalGamesData.player3 === null ||  LocalGamesData.player3 === undefined
        || LocalGamesData.player4 === null ||  LocalGamesData.player4 === undefined
      ){
        navigate('/game/PingPong_Lobby');
      };
  })

  const [Matches, setMatches] = useState({
    Semi_Final_1: {
      player1: LocalGamesData.player1,
      player2: LocalGamesData.player2,
      winner: null,
      isReadyP1: false,
      isReadyP2: false,
      thier_Turn: true,
    },
    Semi_Final_2: {
      player1: LocalGamesData.player3,
      player2: LocalGamesData.player4,
      winner: null,
      isReadyP3: false,
      isReadyP4: false,
      thier_Turn: false,
    },
    Final: {
      player1: LocalGamesData.TBD1,
      player2: LocalGamesData.TBD2,
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

    setLocalGamesData({
      gametype: 'Tournament', // Local, Multiplayer, Tournament 
      // player1: player1Name,
      // player2: player2Name,
      // player3: player3Name,
      // player4: player4Name,
      // Winner : null,
    });
    
    navigate('/game/LocalGame');
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
    {
      title: 'Winner',
      seeds: [
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [
            { name: Matches.Final?.player1 || 'TBD' },
            // { name: Matches.Final?.player2 || 'TBD' },
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


 