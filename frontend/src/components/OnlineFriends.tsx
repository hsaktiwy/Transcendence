import * as React from "react"
import { useContext, useState } from "react"
// import { import.meta.env.VITE_axiosPath } from "@/utils/Constants"
import { UserContext } from "./UserContext"
import { Link } from "react-router-dom"
import { SkeletonTheme } from 'react-loading-skeleton'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function OnlineFriends() {
    const userContext = useContext(UserContext)
    if (!useContext)
        throw new Error('invalid scope')
    const friends = userContext?.friends
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFriends, setFilteredFriends] = useState([]);
    
    // const friends = [
    //     {
    //         login: "user1",
    //         firstName: "user",
    //         lastName: "nickname",
    //         profile_pic: "/media/user2/geto.jpg",
    //     },
    //     {
    //         login: "user2",
    //         firstName: "user2",
    //         lastName: "nickname2",
    //         profile_pic: "/media/user3/5bc9f3ef6549c64e76cf66bc0bbebf8e.jpg",
    //     },
    //     {
    //         login: "hachahbo",
    //         firstName: "hamza",
    //         lastName: "chahboune",
    //         profile_pic: "/media/user2/geto.jpg",
    //     },
    // ];

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter friends based on login, firstName, or lastName
        const results = friends.filter((friend) =>
            friend.login.toLowerCase().includes(value) ||
            friend.firstName.toLowerCase().includes(value) ||
            friend.lastName.toLowerCase().includes(value)
        );

        setFilteredFriends(results);
    };
    console.log('here-->', userContext?.friends)
  return (
    <>
        <div className='onlineFriends-div  pt-5 h-full '>
                    <div className='divs-online bg-gradient-to-br from-[#283137] to-[#242729] relative '>
                        {
                            !userContext?.friends.length && 
                                <>
                                <div className="absolute  h-full w-full bg-gradient-to-tr from-[#2c353a] to-[#2B2F32]rounded-xl  flex flex-col justify-center items-center gap-5 py-7">
                                    <div>
                                        <svg width="80" height="80" viewBox="0 0 24 24" fill="white" stroke=""  xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.25 7.75C14.25 8.99264 13.2426 10 12 10V11.5C14.0711 11.5 15.75 9.82107 15.75 7.75H14.25ZM12 10C10.7574 10 9.75 8.99264 9.75 7.75H8.25C8.25 9.82107 9.92893 11.5 12 11.5V10ZM9.75 7.75C9.75 6.50736 10.7574 5.5 12 5.5V4C9.92893 4 8.25 5.67893 8.25 7.75H9.75ZM12 5.5C13.2426 5.5 14.25 6.50736 14.25 7.75H15.75C15.75 5.67893 14.0711 4 12 4V5.5ZM9 14.5H15V13H9V14.5ZM15 19H9V20.5H15V19ZM9 19C7.75736 19 6.75 17.9926 6.75 16.75H5.25C5.25 18.8211 6.92893 20.5 9 20.5V19ZM17.25 16.75C17.25 17.9926 16.2426 19 15 19V20.5C17.0711 20.5 18.75 18.8211 18.75 16.75H17.25ZM15 14.5C16.2426 14.5 17.25 15.5074 17.25 16.75H18.75C18.75 14.6789 17.0711 13 15 13V14.5ZM9 13C6.92893 13 5.25 14.6789 5.25 16.75H6.75C6.75 15.5074 7.75736 14.5 9 14.5V13Z" fill="ffffff"/>
                                            <path d="M7.75214 10.3887C7.59441 10.1353 7.29846 10 7 10C5.75736 10 4.75 8.99264 4.75 7.75C4.75 6.50736 5.75736 5.5 7 5.5C7.29846 5.5 7.59441 5.36473 7.75214 5.11135C7.75912 5.10014 7.76613 5.08896 7.7732 5.07782C8.0358 4.66331 7.90275 4.0764 7.415 4.0227C7.27873 4.0077 7.14027 4 7 4C4.92893 4 3.25 5.67893 3.25 7.75C3.25 9.82107 4.92893 11.5 7 11.5C7.14027 11.5 7.27873 11.4923 7.415 11.4773C7.90275 11.4236 8.0358 10.8367 7.7732 10.4222C7.76614 10.411 7.75912 10.3999 7.75214 10.3887Z" fill="ffffff"/>
                                            <path d="M4.70829 18.3169C4.59477 18.1275 4.39439 18 4.17359 18H4C2.75736 18 1.75 16.9926 1.75 15.75C1.75 14.5074 2.75736 13.5 4 13.5H4.17359C4.39439 13.5 4.59477 13.3725 4.70829 13.1831C4.98539 12.7208 4.68468 12 4.14569 12H4C1.92893 12 0.25 13.6789 0.25 15.75C0.25 17.8211 1.92893 19.5 4 19.5H4.14569C4.68469 19.5 4.98539 18.7792 4.70829 18.3169Z" fill="ffffff"/>
                                            <path d="M16.2268 10.4222C15.9642 10.8367 16.0973 11.4236 16.585 11.4773C16.7213 11.4923 16.8597 11.5 17 11.5C19.0711 11.5 20.75 9.82107 20.75 7.75C20.75 5.67893 19.0711 4 17 4C16.8597 4 16.7213 4.0077 16.585 4.0227C16.0973 4.0764 15.9642 4.66331 16.2268 5.07782C16.2339 5.08896 16.2409 5.10014 16.2479 5.11134C16.4056 5.36472 16.7015 5.5 17 5.5C18.2426 5.5 19.25 6.50736 19.25 7.75C19.25 8.99264 18.2426 10 17 10C16.7015 10 16.4056 10.1353 16.2479 10.3887C16.2409 10.3999 16.2339 10.411 16.2268 10.4222Z" fill="ffffff"/>
                                            <path d="M19.2917 18.3169C19.0146 18.7792 19.3153 19.5 19.8543 19.5H20C22.0711 19.5 23.75 17.8211 23.75 15.75C23.75 13.6789 22.0711 12 20 12H19.8543C19.3153 12 19.0146 12.7208 19.2917 13.1831C19.4052 13.3725 19.6056 13.5 19.8264 13.5H20C21.2426 13.5 22.25 14.5074 22.25 15.75C22.25 16.9926 21.2426 18 20 18H19.8264C19.6056 18 19.4052 18.1275 19.2917 18.3169Z" fill="ffffff"/>
                                        </svg>
                                    </div>
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
                        <div className="relative h-9 w-full ">
                            <input
                                className="search-bar-div-friends  h-8 w-4/5 px-3 py-5   rounded-lg "
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {/* Dropdown only appears if searchTerm exists */}
                            {searchTerm && filteredFriends.length > 0 && (
                                <div className="mt-1  w-4/5 bg-gradient-to-br from-[#2a3236] to-[#1e2124]  p-2  rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                    {filteredFriends.map((friend) => (
                                        <Link to={`/profile/${friend.login}`}
                                            key={friend.login}
                                            className="flex items-center gap-3 px-4 py-2   w-full rounded-xl transition-all duration-200 ease-in-out rounded-xl hover:bg-[#1D1E22] cursor-pointer"
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_axiosPath}${friend.profile_pic}`}
                                                alt={`${friend.firstName} ${friend.lastName}`}
                                                className="w-10 h-10 aspect-square rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="text-sm font-medium">{friend.firstName} {friend.lastName}</p>
                                                <p className="text-xs text-gray-500">@{friend.login}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                            <img style={{width: '15px', marginRight: '10px'}} className="size-image" src="/images/profileVector.svg" />
                            <img style={{width: '23px'}} className="size-image" src="/images/Settings.svg" />
                        </div>
                        {
                            userContext?.friends.length && 
                                    <h3 className="font-semibold m-4 w-20 2xl:mx-7">Friends</h3>
                        }

                        <div className='online-users  px-8'>
                        {
                            userContext?.friends.map((friend, index)=>{
                                return(
                                    <Link
                                    to={`/profile/${friend.login}`}
                                    key={index}
                                    className="each-user relative px-10  my-2  rounded-xl hover:bg-[#1D1E22] overflow-hidden"
                                    style={{ backgroundImage: `url(${import.meta.env.VITE_axiosPath}${friend.CoverProfile})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                  >
                                    <div className="absolute inset-0 bg-black/70  rounded-xl pointer-events-none"></div>
                                    <img className="w-14 h-14 z-10 aspect-square rounded-full object-cover" src={`${import.meta.env.VITE_axiosPath}${friend.profile_pic}`} />
                                    <div className=" mx-3 z-10 flex flex-col items-start justify-center  w-72 ">
                                        <h1 className="font-medium  z-10 text-base">{`${friend.firstName} ${friend.lastName} `}</h1>
                                        <h1 className="font-normal z-10 opacity-80 text-xs text-left">{`@${friend.login}`}</h1>
                                    </div>
                                    <div className='is-online z-10'>
                                        <div className='green-dot'></div>
                                    </div>
                                    
                                </Link>
                                )
                            })
                        }
                            
                            
                        </div>
                        {
                            userContext?.friends.length && 
                                <>
                                    <div className='chat-direction'>
                                        <div className='chat-button'>
                                            <img style={{width: '20px'}} className="size-image" src="/images/chat_bubble.svg" />
                                                <h3 style={{fontWeight: '400', margin:'0px 4px', fontSize: '12px'}}>Chat</h3>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
            </div >
    </>
  )
}

export default OnlineFriends