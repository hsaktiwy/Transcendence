// MatchContext.jsx

// // Matchmaking Context
import  { createContext, useState, useContext } from 'react';

// 1) Create the context
const MatchContext = createContext(null);

// 2) Create a provider
export function MatchProvider({ children }) {
  const [matchData, setMatchData] = useState({
    roomName: null,
    myId: null,
    opponentId: null,
    gametype: null, // Local, Multiplayer, Tournament 
    user_name: null,
    opponent_user: null,
    color: ''
  });

  return (
    <MatchContext.Provider value={{ matchData, setMatchData }}>
      {children}
    </MatchContext.Provider>
  );
}

// 3) Custom hook for convenience
export function useMatchContext() {
  return useContext(MatchContext);
}



// Local User Context (Local Games Context)
const LocalGamesContext = createContext(null);

export function LocalGamesProvider({ children }) {
  const [LocalGamesData, setLocalGamesData] = useState({
    gametype: null, // Local, Multiplayer, Tournament 
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    winner : null,
    //infos for tournament ...
    //images ...
  });

  return (
    <LocalGamesContext.Provider value={{ LocalGamesData, setLocalGamesData }}>
      {children}
    </LocalGamesContext.Provider>
  );
}

export function useLocalGamesContext() {
  return useContext(LocalGamesContext);
}



// MatchContext.jsx
// Remote User Context (Remote Game Context)

const RemoteGameContext = createContext(null);

export function RemoteGameProvider({ children }) {
  const [ReomteGameData, setReomteGameData] = useState({
    player1 : null,
    player2 : null,
    p1_image: null,
    p2_image: null,
    winner  : null,
  });

  return (
    <RemoteGameContext.Provider value={{ ReomteGameData, setReomteGameData }}>
      {children}
    </RemoteGameContext.Provider>
  );
}

export function useRemoteGameContext() {
  return useContext(RemoteGameContext);
}