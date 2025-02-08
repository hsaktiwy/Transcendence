import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bracket } from 'react-brackets';
import MatchCard from '../components/MatchCard';
import MatchHistory from '../components/HistoryCard';
import './Tournament.css';
import './style.css';
import { useLocalGamesContext } from '../game/MatchContext';
import { useEffect } from 'react';

function Tournament() {
  const navigate = useNavigate();
  const { LocalGamesData }    = useLocalGamesContext();
  const { setLocalGamesData } = useLocalGamesContext();

  
  // useEffect( () => {
  //     if ( LocalGamesData.gametype !== 'Tournament'
  //       || LocalGamesData.player1 === null ||  LocalGamesData.player1 === undefined 
  //       || LocalGamesData.player2 === null ||  LocalGamesData.player2 === undefined  
  //       || LocalGamesData.player3 === null ||  LocalGamesData.player3 === undefined
  //       || LocalGamesData.player4 === null ||  LocalGamesData.player4 === undefined
  //     ){
  //       navigate('/game/PingPong_Lobby');
  //     };
  // })
  console.log('====> Getted Info : ', LocalGamesData);

  const [Matches, setMatches] = useState({
    Semi_Final_1: {
      player1   : LocalGamesData.player1,
      player2   : LocalGamesData.player2,
      winner    : LocalGamesData.TBD1,
      isReadyP1 : false,
      isReadyP2 : false,
      Their_turn: true,
      Done: false
    },
    Semi_Final_2: {
      player1   : LocalGamesData.player3,
      player2   : LocalGamesData.player4,
      winner    : LocalGamesData.TBD2,
      isReadyP3 : false,
      isReadyP4 : false,
      Their_turn: false,
      Done: false
    },
    Final: {
      player1   : LocalGamesData.TBD1,
      player2   : LocalGamesData.TBD2,
      winner    : LocalGamesData.winner,
      isReadyF1 : false,
      isReadyF2 : false,
      Their_turn: false,
      Done: false
    },
  });
  
  const handleReady = (matchId, whichPlayer) => {
    setMatches((prev) => {
      const newMatch = { ...prev[matchId] };
      if (whichPlayer === 'player1') {
        newMatch.isReadyP1 = !newMatch.isReadyP1;
      } else if (whichPlayer === 'player2') {
        newMatch.isReadyP2 = !newMatch.isReadyP2;
      } else if (whichPlayer === 'player3') {
        newMatch.isReadyP3 = !newMatch.isReadyP3;
      } else if (whichPlayer === 'player4') {
        newMatch.isReadyP4 = !newMatch.isReadyP4;
      }
      return {
        ...prev,
        [matchId]: newMatch,
      };
    });
  };

  const handleStartMatch = (matchId) => {
    console.log(`Starting match: ${matchId}`);
    if (matchId === 'Semi_Final_2'){
      // l7maaaa9
      LocalGamesData.player1 = LocalGamesData.player3;
      LocalGamesData.player2 = LocalGamesData.player4;
      setLocalGamesData(LocalGamesData)
    }
    else if (matchId === 'Final'){
      LocalGamesData.player1 = LocalGamesData.TBD1;
      LocalGamesData.player2 = LocalGamesData.TBD2;
      setLocalGamesData(LocalGamesData)
    }
    

    console.log("===> Local Data : ", LocalGamesData);

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
            { name: Matches.Final?.winner || 'TBD' },
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
              <MatchHistory 
                matchId="Semi_Final_1"
                matchData={Matches.Semi_Final_1}
              />
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


 