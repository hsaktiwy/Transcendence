import React, { useContext, useEffect, useState }  from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserContext } from "./UserContext";
import mailman from "@/utils/AxiosFetcher";
import { rankInterface } from "@/utils/interfaces";
import { Link } from "react-router-dom";

function RankFile() {

    const userContextConsumer = useContext(UserContext)
    const [userRank, setUserRank] = useState<rankInterface[] | undefined>([]);

    if (!userContextConsumer)
    throw new Error("userContext must be used within a UserProvider");
    const rankData = async() =>
    {
        try{

            const req = {
                url: `/profile/get_top_rank/`,
                method: 'GET',
            };
            const resp = await mailman(req);
            if(resp.data.profiles)
            setUserRank(resp.data.profiles);
        }
        catch (err){
            console.error(" ",err)
        }
    }

    const currentUser = userRank?.find(user => user.user.login === userContextConsumer?.userData?.login);
    useEffect(()=>{
        rankData()
    },[])

    React.useEffect(()=>{}, [])    
  return (
    <>
        {!userRank ? (  <div className="text-2xl h-full w-full rounded-2xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-lg font-semibold flex flex-col justify-center items-center p-4">
              <div className="flex justify-center items-center rounded-xl bg-gradient-to-bl from-[#283137] to-[#242729] flex-col p-6">
              <img className="w-10" src="/PaddelTime.svg"></img>

                <h1 className="text-center m-2 text-lg">You haven't played any matches yet</h1>
              </div>
            </div>) : (

    <div className=" 2xl:col-span-2 rounded-2xl  bg-[#2B2F32]   text-center text-xl text-white h-96 sm:h-full  ">
                        <div className=" flex justify-center items-center p-4  2xl:col-span-2 rounded-2xl  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl  shadow-3xl shadow-[#22333869] rounded-text-center text-xl text-white h-full  ">
                            <div className=" relative grid-item1 col-span-3 w-full  ">
                                                <div className="h-full  rounded-2xl p-7 w-full bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] flex flex-col justify-center items-center">
                                                        <div className="w-full">
                                                                <h1 className="font-semibold text-left mb-2 md:text-2xl">Rank</h1>
                                                                <div className="border-rank  w-full  bg-[#5E97A9] h-[1px] rounded-full "></div>
                                                        </div>
                                    <ScrollArea className="h-full w-full overflow-y-auto rounded-md pb-12">
                                        {userRank?.map((user, index) => (
                                            <div key={index+1} className="w-full m-1">
                                            <Link to={`/profile/${user.user.unique_id}`} className="h-16 gap-3 md:px-5 flex items-center">
                                                <h1 className="text-xl md:text-base font-medium">#{user.profile.rank}</h1>
                                                <div className="min-w-32 w-[100%] h-full flex items-center">
                                                <img className="w-11 aspect-square rounded-full object-cover " src={`${import.meta.env.VITE_axiosPath}${user.user.profile_pic}`} alt={user.user.login} />
                                                <div className="mx-3">
                                                    <h1 className="font-medium text-xs">{user.user.firstName} {user.user.lastName}</h1>
                                                    <h1 className="font-normal opacity-80 text-xs text-left">@{user.user.login}</h1>
                                                </div>
                                                </div>
                                                <div className=" text-sm"> {user.profile.level.toFixed(2)} level</div>
                                            </Link>
                                            <div className="border-rank my-1 w-full bg-[#5E97A9] h-[1px] rounded-full"></div>
                                            </div>
                                        ))}
                                        </ScrollArea>
                                        <div className=" absolute px-6 w-full bottom-4 h-14">
                                            <div className=" rounded-xl h-full w-full px-2 bg-gradient-to-tr from-[#324951] to-[#2B2F32] md:px-5 flex items-center">
                                            <h1 className="text-xl md:text-base font-medium">#{currentUser?.profile.rank}</h1>
                                                <div className="min-w-32 w-[100%] h-full flex items-center">
                                                <img className="w-11 ml-3 aspect-square rounded-full object-cover " src={`${import.meta.env.VITE_axiosPath}${currentUser?.user.profile_pic}`} alt={currentUser?.user.login} />
                                                <div className="mx-3">
                                                    <h1 className="font-medium text-xs">{currentUser?.user.firstName} {currentUser?.user.lastName}</h1>
                                                    <h1 className="font-normal opacity-80 text-xs text-left">@{currentUser?.user.login}</h1>
                                                </div>
                                                </div>
                                                <div className="text-sm"> {currentUser?.profile.level.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
        )}
    </>
  )
}


export default RankFile