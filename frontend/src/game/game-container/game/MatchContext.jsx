// MatchContext.jsx

// // Matchmaking Context
import  { createContext, useState, useContext } from 'react';


// Local User Context (Local Games Context)
const LocalGamesContext = createContext(null);

export function LocalGamesProvider({ children }) {
  const [LocalGamesData, setLocalGamesData] = useState({
    gametype: null, // Local, Multiplayer, Tournament 
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    TBD1   : null,
    TBD2   : null,
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

    room_name: null,
    role     : null,
    my_user  : null,
    opponent : null,
    p1_id    : null,
    p2_id    : null,
    winner   : null,
    color    : null

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