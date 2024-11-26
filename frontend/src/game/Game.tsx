import { useContext, useEffect, useState } from "react";
import LoadingIndecator from "../components/Loading";
import { WebSocketContext } from "../utils/WSContext";
import PingPong from "./PingPong";
import mailman from "@/utils/AxiosFetcher";
import { AxiosError } from "axios";

function Game()
{
    const [send, setSend] = useState<boolean>(false);
    const socketContext = useContext(WebSocketContext);
    const [join, setjoin] = useState<Boolean>(false);
    const [list, setList] =  useState<string>('');
    const {socket}  = socketContext;
    const [responce, setResponce] = useState<string>("");
    

    const ListGames = async () =>
    {
        try{
            const req = {
                url : '/game/list/',
                method : 'GET',
                withCredentials:true,
            }
            const resp = await mailman(req);
            setResponce(JSON.stringify(resp.data));
        }
        catch (res)
        {
            setResponce("Error: " + res);
        }
    }

    useEffect(()=>{
        console.log('rendring : '+( send ? 'True' :  'False'))
        ListGames();
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

    // const sendMessage = async (par:string)=>
    // {
    //     try{
    //         const element:string | undefined= document.getElementById('#gameId')?.innerHTML
    //         const action :string | undefined = par + ((par == 'join') ? ((element) ? element : '') : '') + '/'
    //         const req = {
    //             url:'/game/' + action,
    //             method: 'GET',
    //             withCredentials:true,
    //         }

    //         const resp = await mailman(req);
    //         setResponce( JSON.stringify(resp.data)+"\n"+responce);
    //     }
    //     catch (res){
    //         const reAxios  = res as AxiosError
    //         setResponce("Error: " + reAxios.response?.data['Error']);
    //     }
    // }
    

    return (
        <div className="bg-black/5 backdrop-filter backdrop-blur-sm  rounded-xl   absolute top-[60px]  left-0 lg:left-[100px] h-[calc(100%-100px)] w-[calc(100%-20px)] lg:w-[calc(100%-100px)] 2xl:w-[calc(80%)] my-[20px] mx-[10px] 2xl:mx-[8%] text-white">
            
            {/* { send ? <LoadingIndecator/> : <input type="button" value="FoundOpponent" className=" h-fit px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-800 transition duration-150 ease-in-out"
                onClick={FoundOpponent}
            />} */}
            {join && <PingPong/>}
            {!join &&
                <div className="flex flex-col  gap-2">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            {/* <div>{list}</div> */}
                            <div className="flex">
                                Join a game:
                                <input  className="text-green-400 w-20"  type="text" placeholder="Game ID" id="gameId"/>
                            </div>
                            <button className="bg-blue-400 rounded-sm text-stone-900" onClick={()=>setjoin(true)}>Join a game</button>
                        </div>
                        {/* <div><div>Response must be here!</div><div>{responce}</div></div> */}
                    </div>
                </div>}
        </div>
    )
}

export default Game;
