import * as React from "react"
import { useContext } from "react"
import { axiosPath } from "@/utils/Constants"
import { UserContext } from "./UserContext"
import { Link } from "react-router-dom"
function OnlineFriends() {
    const userContext = useContext(UserContext)
    if (!useContext)
        throw new Error('invalid scope')
  return (
    <>
        <div className='onlineFriends-div  pt-5 h-full '>
                    <div className='divs-online bg-gradient-to-tr from-[#2c353a] to-[#2B2F32] relative '>
                        {
                            !userContext?.friends.length && 
                                <>
                                <div className="absolute left-0 top-0 h-full w-full  bg-[url('https://cdn.dribbble.com/users/923831/screenshots/3343734/media/a77c0300141f8a7fc700c6fcaa510f70.png?resize=800x600&vertical=center')] bg-center bg-cover rounded-xl z-30">
                                </div>
                                <div className="absolute left-0 top-0 h-full w-full  bg-gradient-to-t from-slate-950 to-black/30 rounded-xl z-40 flex flex-col justify-end items-center gap-5 py-7">
                                    <p className="font-semibold text-xl">Your Friend List is empty</p>
                                    <div className='chat-direction'>
                                        <div className='chat-button'>
                                            <img style={{width: '20px'}} className="size-image" src="/images/chat_bubble.svg" />
                                                <h3 style={{fontWeight: '400', margin:'0px 4px', fontSize: '12px'}}>Add friends</h3>
                                        </div>
                                    </div>
                                            
                                </div>
                                </>
                        }
                        <div className='bar-search-freinds z-50'>
                            <input className='search-bar-div-friends'  placeholder='Search' />
                            <img style={{width: '15px', marginRight: '10px'}} className="size-image" src="/images/profileVector.svg" />
                            <img style={{width: '23px'}} className="size-image" src="/images/Settings.svg" />
                        </div>
                        <h3 className="font-semibold m-4 w-20 2xl:mx-7">Friends</h3>
                        <div className='online-users  px-4'>
                        {
                            userContext?.friends.map((friend, index)=>{
                                return(
                                <Link to={`/profile/${friend.login}`} key={index} className="each-user">
                                    <img className="w-14 h-14 rounded-full" src={`${axiosPath}${friend.profile_pic}`} />
                                    <div className=" mx-3  flex flex-col items-start justify-center  w-72 ">
                                        <h1 className="font-medium text-base">{`${friend.firstName} ${friend.lastName}`}</h1>
                                        <h1 className="font-normal opacity-80 text-xs text-left">{friend.login}</h1>
                                    </div>
                                    <div className='is-online '>
                                        <div className='green-dot'></div>
                                    </div>
                                    
                                </Link>
                                )
                            })
                        }
                            {/* <div className='each-user '>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                <h1 className="font-medium text-base">Hamza Chahboune</h1>
                                <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online '>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium text-base">Hamza Chahboune</h1>
                                    <h1 className="font-normal opacity-80  text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user '>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium text-base">Hamza Chahboune</h1>
                                    <h1 className="font-normal opacity-80  text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-semibold">Hamza Chahboune</h1>
                                    <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium ">Hamza Chahboune</h1>
                                    <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div>
                            <div className='each-user'>
                                <img className="w-14" src="/images/Frame 28 (1).svg" />
                                <div className=" mx-3  flex flex-col items-start justify-center  w-72">
                                    <h1 className="font-medium text-base">Hamza Chahboune</h1>
                                    <h1 className="font-normal opacity-80 text-xs text-left">@hachahbo</h1>
                                </div>
                                <div className='is-online'>
                                    <div className='green-dot'></div>
                                </div>
                                
                            </div> */}
                            
                        </div>
                        <div className='chat-direction'>
                            <div className='chat-button'>
                                <img style={{width: '20px'}} className="size-image" src="/images/chat_bubble.svg" />
                                    <h3 style={{fontWeight: '400', margin:'0px 4px', fontSize: '12px'}}>Chat</h3>
                            </div>
                        </div>
                    </div>
            </div >
    </>
  )
}

export default OnlineFriends