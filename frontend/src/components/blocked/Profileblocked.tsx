import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SlLock } from "react-icons/sl";
import { UserDataInterface, ProfileDataInterface } from "../../utils/UserDataInterface";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import mailman from "../../utils/AxiosFetcher";
import { NotificationPropreties } from "../UserContext";
import { WebSocketContext } from "../../utils/WSContext";
import ConnectButton from "../connectButton.tsx";
import { Link } from "react-router-dom"



function ProfileLocked() {
  const SocketContext = useContext(WebSocketContext)
  const [channel_id, setChannelId] = useState<number | undefined>(undefined);
  
  
  if (!SocketContext)
      throw new Error('error')
 const [profileData, setProfileData] = useState<UserDataInterface | ProfileDataInterface | undefined>(undefined)
const [isLoading, setIsLoading] = useState(true);
 const {uuid} = useParams();
 const userContextConsumer = useContext(UserContext)
 if (!userContextConsumer)
  throw new Error("userContext must be used within a UserProvider");

 const fetchUserData = async () =>{
   try {

    // check if the user is already existing friend
    const user = userContextConsumer.friends.filter(friend=>(friend.unique_id === uuid)); 
    if (user.length === 0)
    {
      const req = {
        url: `/api/users/${uuid}/`,
        method: 'GET',
      };
      const resp = await mailman(req);
      const respData : ProfileDataInterface = resp.data
      setProfileData(respData);
    }
    else
    {
      setProfileData(user[0])
    }
  } catch (err) {
    console.error(err);
  }
};

// const getChannelId = async () =>{
//   try{
//       const req = {
//           url: "/chat/conversation/get_channel/"+uuid+'/',
//           method: 'GET'
//       }
//       const resp = await mailman(req)
//       const id:number = resp.data.channel_id;
//       if (id)
//           setChannelId(id);
//   }
//   catch (error){


//   }
// }

// useEffect to handle the loading state
useEffect(() => {
  // Fetch the data when the component mounts
  fetchUserData().finally(() => {
    // Add a delay of 1.2 seconds before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 500);

    // Cleanup timer
    return () => clearTimeout(timer);
  });
}, [uuid]); 


 useEffect(() =>{
  if (userContextConsumer?.userData?.login !== uuid){
      fetchUserData()
  }
  else{
      setProfileData(userContextConsumer?.userData)
  }
 },[uuid])
  console.log(profileData);
  return (
    <div className="animate-pulse">
      <div className="lg:mb-0 pb-20 font-poppins 2xl:my-[20px] p-3 lg:ml-[70px] dashboard-container md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] 2xl:p-10 2xl:pt-0 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4">

        <div className="rounded-2xl row-span-1 justify-center items-center md:col-span-12 md:row-span-3 xl:row-span-5 2xl:col-span-12 xxl:row-span-6 xxl:col-span-9 grid grid-cols-12">
          <div className="h-full col-span-12 sm:col-span-3 bg-gradient-to-br from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] rounded-xl 2xl:col-span-2 flex flex-col justify-center items-center">
          <div className=" pt-4 h-full  col-span-2  flex  flex-col  justify-center items-center rounded-2xl  ">           
                                        <img className="size-24   md:size-28 xl:size-38 aspect-square rounded-full object-cover  xxl:size-42 " src={`${import.meta.env.VITE_axiosPath}${profileData?.profile_pic}`} alt="user-image" />
                                                
                                                <div className=" flex  mt-5 flex-col justify-center ">
                                                    <h1 className=" sm:text-[80%] text-center font-bold  xxl:text-[120%]">{`${profileData?.firstName} ${profileData?.lastName}`} </h1>
                                                    <h1 className="sm:text-[80%] text-center font-normal text-gray-300">@{profileData?.login}</h1>
                                                </div>
                                                {userContextConsumer?.userData?.login === uuid ? (
                                                    <Link to="/settings"> 
                                                        <button className="text-white m-2 px-4 py-2 xl:h-10 xl:px-7 2xl:py-1 font-semibold rounded-xl border border-white/30 text-sm xl:text-md min-w-[120px] duration-200 transition-all active:bg-[#5E97A9] hover:border-[#5E97A9] flex gap-3 items-center justify-center focus:outline-none active:outline-none">
                                                        Edit profile</button>
                                                    </Link> 
                                                    ) : (
                                                        <ConnectButton user={profileData}/> 
                                                    )}
                                    </div>
          </div>

          <div className="h-full mt-4 sm:mt-0 col-span-12  sm:col-span-9 sm:pl-4 2xl:col-span-10">
            <div className="flex items-center justify-center p-4 w-full sm:h-full xxl:p-10 bg-gradient-to-br from-[#283137] to-[#242729] shadow-3xl shadow-[#22333869] rounded-2xl">
              <div className="w-full h-full grid gap-4 grid-rows-2">
                <div className="relative bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] shadow-md px-5 lg:px-10 rounded-3xl grid grid-rows-1">
                  <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
                  <div className="h-20 hidden sm:flex items-center xxl:items-end">
                    <div className="w-[144px] h-[32px] bg-[#2f3a41] rounded-xl" />
                  </div>
                  <div className="flex flex-col justify-center items-center mb-4">
                    <div className="w-[96px] h-[24px] bg-[#2f3a41] rounded" />
                  </div>
                  <div className="w-full h-[12px] bg-[#2f3a41] rounded-full mb-5" />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-40 flex justify-center items-center text-white text-3xl">
                                          <SlLock />
                    </div>
                </div>

                <ScrollArea className="w-full overflow-x-scroll whitespace-nowrap rounded-md">
                  <div className="flex gap-4 justify-center">
                    {[...Array(9)].map((_, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-md p-3 mt-6 h-32 w-32 xxl:h-48 xxl:w-48">
                          <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-40 flex justify-center items-center text-white text-3xl">
                                          <SlLock />
                          </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden xxl:block xl:col-span-4 xl:row-span-4 2xl:col-span-3 xxl:row-span-6">
          <div className="rounded-2xl  bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] h-full p-4">
            <div className="flex flex-col space-y-4 h-full">
              <div className="row-span-2 px-6  flex items-center justify-between w-full">
                <div className="flex items-center justify-center p-4 flex-col gap-3">
                  <div className="w-[100px] h-[100px] bg-[#2f3a41] rounded-full" />
                  <div className="w-[80px] h-[20px] bg-[#2f3a41] rounded" />
                </div>
                <div className="w-[60px] h-[30px] bg-[#2f3a41] rounded" />
                <div className="flex items-center justify-center flex-col gap-3">
                  <div className="w-[100px] h-[100px] bg-[#2f3a41] rounded-full" />
                  <div className="w-[80px] h-[20px] bg-[#2f3a41] rounded" />
                </div>
              </div>
              <div className="pt-2 row-span-4">
                <h1 className="text-base text-gray-400 font-medium"></h1>
                <div className="w-full border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
                <div className="h-40 xxl:h-72 overflow-y-auto px-5">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="w-full mb-4 relative flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4"
                    >
                      <div className="bg-gradient-to-b from-[#84D679] via-[#598752] to-[#2D392C] w-1 h-16 rounded-r-lg"></div>
                      <div className="w-full mr-4">
                        <div className="flex items-center">
                          <div className="min-w-32 w-[100%] h-full flex items-center">
                            <div className="w-[44px] h-[44px] bg-[#2f3a41] rounded-full" />
                            <div className="mx-3">
                              <div className="w-[100px] h-[16px] bg-[#2f3a41] rounded" />
                              <div className="w-[70px] h-[12px] bg-[#2f3a41] rounded" />
                            </div>
                          </div>
                          <div className="w-[24px] h-[24px] bg-[#2f3a41] rounded" />
                        </div>
                        <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>
                      </div>
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-40 flex justify-center items-center text-white text-3xl">
                                          <SlLock />
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl xxl:px-7  md:hidden xl:block row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 xxl:row-span-6 xl:p-3 xxl:p-10 flex justify-center items-center bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869]">
          <div className="h-full w-full py-6 flex  relative flex-col gap-3 bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] rounded-xl justify-center items-center">
            <div className="rounded-full bg-[#2f3a41] w-[200px] h-[200px] lg:w-[150px] lg:h-[150px]" />
            <div className="bg-[#2f3a41] w-[100px] h-[16px] rounded" />
            <div className="bg-[#2f3a41] w-[150px] h-[20px] rounded" />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-40 flex justify-center items-center text-white text-3xl">
                                          <SlLock />
                    </div>
          </div>
        </div>
        <div className="row-span-4 md:col-span-12 md:row-span-3 rounded-2xl p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] xl:col-span-8 xl:row-span-4 2xl:col-span-9 xxl:row-span-6 xxl:col-span-6">
          <div className="w-full h-full relative bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
            <div className="border-none h-full w-full rounded-lg shadow-md">
              <div className="p-2">
                <div className="bg-[#2f3a41] w-[50%] h-[20px] rounded" />
                <div className="bg-[#2f3a41] w-[30%] h-[16px] rounded mt-2" />
              </div>
              <div className="p-4 flex items-center justify-center w-full h-[90%]">
                <div className="w-full h-64 md:h-full p-3">
                  <div className="bg-[#2f3a41] h-full w-full rounded-xl" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-40 flex justify-center items-center text-white text-3xl">
                                          <SlLock />
                    </div>
          </div>
        </div>
        <div className="row-span-4 md:col-span-6 md:row-span-3 xl:col-span-4 xl:h-96 2xl:col-span-4 xxl:h-[548px] xxl:col-span-3 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] rounded-2xl shadow-md p-4">
          <div className="flex flex-col h-full relative  p-2 overflow-y-auto">
            <div className="mb-4">
              <div className="bg-[#2f3a41] w-[60%] h-[24px] rounded" />
            </div>
              <div className="flex flex-col gap-4 flex-1">
              {[...Array(8)].map((_, index) => (
                  <div key={index} className="relative flex items-center gap-4 p-2 bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] rounded-lg">
                    {/* Item Content */}
                    <div className="bg-[#2f3a41] rounded-full w-[40px] h-[40px]" />
                    <div className="flex-1">
                      <div className="bg-[#2f3a41] w-[70%] h-[16px] rounded" />
                      <div className="bg-[#2f3a41] w-[50%] h-[14px] rounded mt-1" />
                    </div>
                    
                    {/* Blur Effect */}
                    <div className="absolute b inset-0 text-xl bg-black/10 backdrop-blur-md rounded-lg z-10 flex justify-center items-center text-white ">
                      <SlLock />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
        </div>
        <div className="row-span-2 hidden md:block md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xxl:hidden">
          <div className="rounded-2xl overflow-y-auto p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] xl:h-96 h-full">
            <div className="mb-4">
              <div className="bg-[#2f3a41] w-[60%] h-[24px] rounded" />
            </div>
            <div className="space-y-4 ">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center  gap-4 bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] shadow-md rounded-lg p-4">
                  <div className="bg-[#2f3a41] rounded-full w-[48px] h-[48px]" />
                  <div className="flex-1">
                    <div className="bg-[#2f3a41] w-[80%] h-[16px] rounded" />
                    <div className="bg-[#2f3a41] w-[50%] h-[14px] rounded mt-1" />
                  </div>
                  <div className="bg-[#2f3a41] w-[32px] h-[24px] rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row-span-2 hidden md:block  md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xl:hidden">
          <div className="gap-4 relative rounded-lg   bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] xl:h-96  h-full w-full  flex items-center  flex-col  justify-center p-4">
              <div className="h-full">
                <div className="absolute bottom-20 inset-0 w-52 h-52 m-auto rounded-full bg-black/20 backdrop-blur-md  z-40 flex justify-center items-center text-white text-3xl">
                                            <SlLock />
                </div>
              </div>  
              <div className="absolute inset-0 top-48 w-60 h-9  bg-black/20 backdrop-blur-md
               rounded-xl m-auto flex justify-center items-center">
                <SlLock />
                </div> 
          </div>
        </div>
        <div className="row-span-2 hidden md:block  md:col-span-6 md:row-span-3 xl:col-span-4 xl:row-span-4 2xl:col-span-4 2xl:row-span-5 xxl:hidden">
          <div className="gap-4 relative rounded-lg   bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32]  shadow-3xl shadow-[#22333869] xl:h-96  h-full w-full  flex items-center  flex-col  justify-center p-4"> 
              <div className="absolute inset-0 w-40 h-9  bg-black/20 backdrop-blur-md
                rounded-xl m-auto flex justify-center items-center">
                    <SlLock />
                </div>
                <div className="absolute top-28 inset-0 w-60 h-9  bg-black/20 backdrop-blur-md
               rounded-xl m-auto flex justify-center items-center">
                <SlLock />
                </div>
                <div className="absolute bottom-28 inset-0 w-60 h-9  bg-black/20 backdrop-blur-md
               rounded-xl m-auto flex justify-center items-center">
                <SlLock />
                </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ProfileLocked;