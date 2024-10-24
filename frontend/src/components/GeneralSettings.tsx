import React, { useContext, useState, useEffect, FormEvent } from "react";
import { UserContext } from "./UserContext";
import { FiEdit2 } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";

function GeneralSettings(){
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("userContext must be used within a UserProvider");
    
    const [firstName, setFirstName] = useState<string| undefined>(undefined);
    const [lastName, setLastName] = useState<string| undefined>(undefined);
    const [email, setEmail] = useState<string| undefined>(undefined);
    const [username, setUsername] = useState<string| undefined>(undefined);
    const [changed, setChanged] = useState<boolean>(false)
  
    useEffect(() => {
      if (userContextConsumer?.userData) {
        setFirstName(userContextConsumer.userData.firstName || '');
        setLastName(userContextConsumer.userData.lastName || '');
        setEmail(userContextConsumer.userData.email || '');
        setUsername(userContextConsumer.userData.login || '');
      }
    }, [userContextConsumer]);
    
    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try{
        if (!changed){
          toast.warning('No change have been made')
        }
        else{
          setChanged(false)
          const req = {
            url: `/api/user/`,
            method: 'PATCH',
            data : {
              firstName: firstName,
              lastName: lastName,
              email: email,
              login: username,
            }
          }
          const response =  await mailman(req)
          if (response.status === 200)
            toast.success('Changes have been applied')
            userContextConsumer.setUserData(prev => ({...prev!, firstName: firstName! , lastName: lastName! , email: email!, login:username!}))
          }
      }
      catch (err){
        toast.error('Error occurred ! Try again')
      }
      console.log({ firstName, lastName, email, username });
  };
  
    return (

      <form onSubmit={handleSubmit} className=" general-settings m-4 sm:m-16  h-[1000px] flex-1 bg-gradient-to-b from-slate-300/10 to-cyan-500/10 rounded-xl p-16 flex justify-center flex-col items-center gap-20 relative">
        {/* <div className="absolute left-0 top-0 h-full w-full backdrop-filter bg-black/80 backdrop-blur-2xl z-50 rounded-xl flex justify-center items-center"> 
          <div className="bg-white p-10 text-black">
            you are connected with 42 

          </div>
        </div> */}
        <div className="flex gap-20 justify-center items-center flex-wrap">
          <div className="flex items-center gap-4 justify-center flex-col sm:flex-row">
            <label htmlFor="firstName" className="w-[100px] self-start sm:self-center">First Name:</label>
            <div className="group relative w-[220px] sm:w-[280px]">
              <input
                id={"firstName"}
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  if (!changed)
                    setChanged(true)
                }}
                className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-1 px-4 flex justify-start items-start w-[220px] sm:w-[280px] outline-none focus:outline-1 focus:outline-[#5E97A9]"
                />
              <div className=" -z-20 duration-100 invisible group-hover:visible absolute right-1 text-white/80 top-[50%] -translate-y-[50%]">
                <FiEdit2 />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start sm:justify-center flex-col sm:flex-row">
            <label htmlFor="lastName" className="w-[100px] self-start sm:self-center">Last Name:</label>
            <div className="group relative w-[220px] sm:w-[280px]">
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  if (!changed)
                    setChanged(true)
                }
              }
              className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-1 px-4 flex justify-start items-start w-[220px] sm:w-[280px] outline-none focus:outline-1 focus:outline-[#5E97A9]"
              />
              <div className=" -z-20 duration-100 invisible group-hover:visible absolute right-1 text-white/80 top-[50%] -translate-y-[50%]">
                <FiEdit2 />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-20 justify-center items-center flex-wrap">
          <div className="flex items-center gap-4 justify-start sm:justify-center flex-col sm:flex-row">
            <label htmlFor="email" className="w-[100px] self-start sm:self-center">Email:</label>
            <div className="group relative w-[220px] sm:w-[280px]">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (!changed)
                    setChanged(true)
                }}
                className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-1 px-4 flex justify-start items-start w-[220px] sm:w-[280px] outline-none focus:outline-1 focus:outline-[#5E97A9]"
                />
              <div className=" -z-20 duration-100 invisible group-hover:visible absolute right-1 text-white/80 top-[50%] -translate-y-[50%]">
                <FiEdit2 />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start sm:justify-center flex-col sm:flex-row">
            <label htmlFor="username" className="w-[100px] self-start sm:self-center">Username:</label>
            <div className="group relative w-[220px] sm:w-[280px]">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (!changed)
                    setChanged(true)
                }}
                className="bg-black/35 backdrop-filter backdrop-blur-sm rounded-2xl py-1 px-4 flex justify-start items-start w-[220px] sm:w-[280px] outline-none focus:outline-1 focus:outline-[#5E97A9]"
                />
              <div className=" -z-20 duration-100 invisible group-hover:visible absolute right-1 text-white/80 top-[50%] -translate-y-[50%]">
                <FiEdit2 />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex gap-8 flex-wrap justify-center items-center">
            <button type="submit" className="w-[150px] bg-[#5E97A9]/70 px-4 py-2 rounded-xl">
                Save Changes
            </button>
            <button type="button" className="w-[150px] bg-black/35 px-4 py-2 rounded-xl" onClick={() =>{
              setFirstName(userContextConsumer.userData?.firstName)
              setLastName(userContextConsumer.userData?.lastName)
              setEmail(userContextConsumer.userData?.email)
              setUsername(userContextConsumer.userData?.login)
              changed ? toast.warning('Changes have been declined') : toast.warning('No change have been made')
            }}>
                Cancel
            </button>
        </div>
      </form>
    );
}
       


export default GeneralSettings