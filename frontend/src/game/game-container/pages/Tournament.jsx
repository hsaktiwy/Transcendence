// tbc


import React, { useState } from 'react';
import './style.css'
import MatchCard from '../components/MatchCard';
import { useNavigate } from 'react-router-dom';
import { Bracket } from 'react-brackets';
// import '../hsaktiwy_css/help.css';

function Tournament({ src }) {
  const navigate = useNavigate();

  const [Matches, setMatches] = useState(
    {
      "Semi_Final_1": { "player1": "players.p1", "player2": "players.p2", "winner": null, "isReadyP1": false, "isReadyP2": false, "thier_Turn": true },
      "Semi_Final_2": { "player1": "players.p3", "player2": "players.p3", "winner": null, "isReadyP3": false, "isReadyP4": false, "thier_Turn": false },
      "Final"       : { "player1": null      , "player2": null      , "winner": null, "isReadyF1": false, "isReadyF2": false, "thier_Turn": false }
    })

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
  
  /////

  return (
    <>
      <div className="center width-full">
        <div className="tournament-container width-90">


          <div className='team width-full min-height-40'>
              <div className='ultra-space-between'>
                  <center>
                    <Bracket rounds={rounds} />
                  </center>
              </div>
          </div>



          <div className="team width-full tournament-statics min-height-35">
            <div className='Stocker'>
              <h1 className='White'>MATCHES QUEUE</h1>
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
    </>
  );
}

export default Tournament;
