import React, { createContext, useEffect, useRef } from "react";

import { useContext, useState } from "react";

interface UserContextInterface{
    id: number | undefined;
    setUserId: React.Dispatch<React.SetStateAction<number | undefined> >;

}

export const UserContext = createContext<UserContextInterface | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{

    const [id, setUserId] = useState<number | undefined>(undefined);
    useEffect(() =>{
        if (id === undefined){
            const savedId = localStorage.getItem("id")
            if (savedId !== null)
                setUserId(Number(savedId))
        }
    }, [])
    return(
        <UserContext.Provider value={{id, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider