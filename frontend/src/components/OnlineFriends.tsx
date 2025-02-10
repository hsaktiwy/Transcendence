
import { useContext, useState } from "react"
// import { import.meta.env.VITE_axiosPath } from "@/utils/Constants"
import { UserContext } from "./UserContext"
import { Link } from "react-router-dom"

import 'react-loading-skeleton/dist/skeleton.css'
import { ProfileDataInterface } from "@/utils/UserDataInterface"

function OnlineFriends() {
    const userContext = useContext(UserContext)
    if (!useContext)
        throw new Error('invalid scope')
    const friends = userContext?.friends
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFriends, setFilteredFriends] = useState<ProfileDataInterface[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter friends based on login, firstName, or lastName
        if(friends){
            const results: ProfileDataInterface[] = friends.filter((friend) =>
                friend.login.toLowerCase().includes(value) ||
                friend.firstName.toLowerCase().includes(value) ||
                friend.lastName.toLowerCase().includes(value)
            );
            setFilteredFriends(results);

        }

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
                                    <div className="w-[50%]">
                                       <img src="/icons/cloudy.svg" alt="" className="object-cover grayscale"/>
                                    </div>
                                    <p className="font-medium text-sm text-white/60 px-3 break-words text-center">No friends, no drama. Enjoy the peace! ...or add some friends.</p>
                                    <div className='chat-direction'>
                                        {/* <div className='chat-button  h-36'>
                                            <img style={{width: '20px'}} className="" src="/images/chat_bubble.svg" />
                                                <h3 style={{fontWeight: '400', margin:'0px 4px', fontSize: '12px'}}>Add friends</h3>
                                        </div> */}
                                    </div>
                                            
                                </div>
                                </>
                        }
                        <div className='bar-search-freinds z-50'>
                        <div className="relative h-9 w-full ">
                            <input
                                className="search-bar-div-friends  h-8 px-3 py-5  border rounded-lg "
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {/* Dropdown only appears if searchTerm exists */}
                            {searchTerm && filteredFriends.length > 0 && (
                               <div className="mt-1 bg-gradient-to-br from-[#2a3236] to-[#1e2124] p-2 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                               {filteredFriends.slice(0, 5).map((friend) => (
                                 <Link
                                   to={`/profile/${friend.unique_id}`}
                                   key={friend.login}
                                   className="flex items-center gap-3 px-4 py-2 w-full rounded-xl transition-all duration-200 ease-in-out hover:bg-[#1D1E22] cursor-pointer"
                                 >
                                   <img
                                     src={`${import.meta.env.VITE_axiosPath}${friend.profile_pic}`}
                                     alt={`${friend.firstName} ${friend.lastName}`}
                                     className="w-10 h-10 aspect-square rounded-full object-cover"
                                   />
                                   <div>
                                     <p className="text-sm font-medium">
                                       {friend.firstName} {friend.lastName}
                                     </p>
                                     <p className="text-xs text-gray-500">@{friend.login}</p>
                                   </div>
                                 </Link>
                               ))}
                             </div>
                            )}
                        </div>
                        </div>
                        

                        <div className='online-users  px-8'>
                        {
                            userContext?.friends.map((friend, index)=>{
                                if (userContext.blockList.filter(blocked=>blocked.unique_id === friend.unique_id).length === 0)
                                {
                                    return(
                                    <Link
                                    to={`/profile/${friend.unique_id}`}
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
                                }
                            })
                        }
                            
                            
                        </div>
                        {
                            userContext?.friends.length && 
                                <>
                                    <Link to={`/chat`}>
                                        <div className='chat-direction h-16'>
                                            <div className='chat-button'>
                                                <img style={{width: '20px'}} className="size-image" src="/images/chat_bubble.svg" />
                                                    <h3 style={{fontWeight: '400', margin:'0px 4px', fontSize: '12px'}}>Chat</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                        }
                    </div>
            </div >
    </>
  )
}

export default OnlineFriends