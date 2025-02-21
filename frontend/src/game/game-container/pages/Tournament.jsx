import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bracket } from 'react-brackets';
import MatchCard from '../components/MatchCard';
import MatchHistory from '../components/HistoryCard';
import './Tournament.css';
import './style.css';
import { useLocalGamesContext } from '../game/MatchContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Tournament() {
  const navigate = useNavigate();
  const { LocalGamesData }    = useLocalGamesContext();
  const { setLocalGamesData } = useLocalGamesContext();
  
  useEffect( () => {
      if (!LocalGamesData || (LocalGamesData && LocalGamesData.gametype !== 'Tournament')){
        navigate('/game/PingPong_Lobby');
      };
  })
  // console.log('====> Getted Info : ', LocalGamesData);

  const [Matches, setMatches] = useState({
    Semi_Final_1: {
      player1   : LocalGamesData.playerx1,
      player2   : LocalGamesData.playerx2,
      winner    : LocalGamesData.TBD1,
      isReadyP1 : false,
      isReadyP2 : false,
      Their_turn: LocalGamesData.F1_turn,
      Done      : LocalGamesData.F1_done,
    },
    Semi_Final_2: {
      player1   : LocalGamesData.player3,
      player2   : LocalGamesData.player4,
      winner    : LocalGamesData.TBD2,
      isReadyP3 : false,
      isReadyP4 : false,
      Their_turn: LocalGamesData.F2_turn,
      Done      : LocalGamesData.F2_done,
    },
    Final: {
      player1   : LocalGamesData.TBD1,
      player2   : LocalGamesData.TBD2,
      winner    : LocalGamesData.winner,
      isReadyF1 : false,
      isReadyF2 : false,
      Their_turn: LocalGamesData.FF_turn,
      Done      : LocalGamesData.FF_done,

    },
  });
  
  useEffect(() => {
    if (LocalGamesData.F1_turn){
      toast.success('Playing now : ' + Matches.Semi_Final_1.player1 + ' vs ' + Matches.Semi_Final_1.player2)
    } else if(LocalGamesData.F2_turn){
      toast.success('Playing now : ' + Matches.Semi_Final_2.player1 + ' vs ' + Matches.Semi_Final_2.player2)    
    } else if(LocalGamesData.FF_turn){
      toast.success('Playing now : ' + Matches.Final.player1 + ' vs ' + Matches.Final.player2) 
    }

  }, [LocalGamesData.F1_turn, LocalGamesData.F2_turn, LocalGamesData.FF_turn])

  // if (Matches.Final.Done === true){
  //   // navigate('/game/')
  //   navigate("/game/Winner")
  // }

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
    // console.log(`Starting match: ${matchId}`);
    if (matchId === 'Semi_Final_1'){
      LocalGamesData.player1 = LocalGamesData.playerx1;
      LocalGamesData.player2 = LocalGamesData.playerx2;

      LocalGamesData.F1_turn = false;
      LocalGamesData.F2_turn = true;
      LocalGamesData.F1_done = true;
      
      // setMatches(Matches)
      setLocalGamesData(LocalGamesData)
    }
    if (matchId === 'Semi_Final_2'){
      // l7maaaa9
      LocalGamesData.player1 = LocalGamesData.player3;
      LocalGamesData.player2 = LocalGamesData.player4;
      
      LocalGamesData.F2_turn = false;
      LocalGamesData.FF_turn = true;
      LocalGamesData.F2_done = true;
      // setMatches(Matches)
      setLocalGamesData(LocalGamesData)
    }
    else if (matchId === 'Final'){
      LocalGamesData.FF_turn = false;
      
      LocalGamesData.player1 = LocalGamesData.TBD1;
      LocalGamesData.player2 = LocalGamesData.TBD2;
      LocalGamesData.FF_done = true;
      // setMatches(Matches)
      setLocalGamesData(LocalGamesData)
    }
    

    // console.log("===> Local Data : ", LocalGamesData);
    // console.log("===> Local Data : ", Matches);

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
            { name: Matches.Semi_Final_1?.player1 || '-----' },
            { name: Matches.Semi_Final_1?.player2 || '-----' },
          ],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [
            { name: Matches.Semi_Final_2?.player1 || '-----' },
            { name: Matches.Semi_Final_2?.player2 || '-----' },
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
            { name: Matches.Final?.player1 || '-----' },
            { name: Matches.Final?.player2 || '-----' },
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
            { name: Matches.Final?.winner || '-----' },
            { name: ' ' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="main-game-page-container ">
      <div className="tournament-page">
        <div className="tournament-layout">
          <div className=" bg-white/5 backdrop-filter backdrop-blur-md border  border-white/20 w-full h-full rounded-3xl ">
            <div className="flex h-96 p-6 justify-center items-center ">
                    <Bracket
                    rounds={rounds}
                    className="text-white bg-gray-900 border border-gray-700"
                  />

            </div>
          </div>

          <div className="matches-section border bg-white/5 backdrop-filter backdrop-blur-md  border-white/20 w-full h-full ">
            <div className=" py-5 bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-3xl rounded-3xl w-full mx-6  flex justify-center items-center flex-col">
              <h1 className="tournament-heading ">MATCHES HISTORY</h1>
              <div className='h-full  '>
                {(Matches.Semi_Final_1.Done && <MatchHistory 
                  matchId="Semi_Final_1"
                  matchData={Matches.Semi_Final_1}
                />)}
                {(Matches.Semi_Final_2.Done && <MatchHistory 
                  matchId="Semi_Final_2"
                  matchData={Matches.Semi_Final_2}
                />)}
                {(Matches.Final.Done && <MatchHistory 
                  matchId="Final"
                  matchData={Matches.Final}
                />)}

              </div>

            </div>

            <div className="vertical-line "/>

            <div className="py-5 bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-3xl rounded-3xl w-full mx-6  flex justify-center items-center flex-col">
              <h1 className="tournament-heading ">MATCHES QUEUE</h1>
              <div className='h-full flex justify-center  items-center w-full'>
                {(Matches.Semi_Final_1.Their_turn 
                 && <MatchCard 
                  matchId="Semi_Final_1"
                  matchData={Matches.Semi_Final_1}
                  onReady={handleReady}
                  onStartMatch={handleStartMatch}
                />)}
                {(Matches.Semi_Final_2.Their_turn  
                && <MatchCard 
                  matchId="Semi_Final_2"
                  matchData={Matches.Semi_Final_2}
                  onReady={handleReady}
                  onStartMatch={handleStartMatch}
                />)}
                {(Matches.Final.Their_turn 
                && <MatchCard 
                  matchId="Final"
                  matchData={Matches.Final}
                  onReady={handleReady}
                  onStartMatch={handleStartMatch}
                />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournament;


 