import { useContext, useEffect, useState } from "react";
import LoadingIndecator from "../components/Loading";
import { WebSocketContext } from "../utils/WSContext";

function Game()
{
    const [send, setSend] = useState<boolean>(false);
    const socketContext = useContext(WebSocketContext);

    const {socket}  = socketContext;

    useEffect(()=>{
        console.log('rendring : '+( send ? 'True' :  'False'))
    },[send])
    
    const FoundOpponent = () =>
    {
        // we will send a ws request to the server to found a Opponent
        if (!send)
        {
            console.log('Send Request')
            const req = JSON.stringify({
                type: 'FIND_OPPONENT'
            })
            socket?.current?.send(req)
            setSend(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            
            { send ? <LoadingIndecator/> : <input type="button" value="FoundOpponent" className=" h-fit px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-800 transition duration-150 ease-in-out"
                onClick={FoundOpponent}
            />}
        </div>
    )
}

export default Game;