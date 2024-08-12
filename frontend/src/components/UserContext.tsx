import React, { createContext, useEffect, useRef } from "react";
import { UserDataInterface } from "../utils/UserDataInterface";
import { useContext, useState } from "react";

interface UserContextInterface{
    id: number | undefined;
    setUserId: React.Dispatch<React.SetStateAction<number | undefined> >;
    userData: UserDataInterface | undefined
    setUserData: React.Dispatch<React.SetStateAction<UserDataInterface | undefined> >;
}

export const UserContext = createContext<UserContextInterface | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{

    const [id, setUserId] = useState<number | undefined>(undefined);
    const [userData, setUserData] = useState<UserDataInterface | undefined>(undefined);
    useEffect(() =>{
        if (id === undefined){
            const savedId = localStorage.getItem("id")
            if (savedId !== null)
                setUserId(Number(savedId))
        }
    }, [])
    return(
        <UserContext.Provider value={{id, setUserId, userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider