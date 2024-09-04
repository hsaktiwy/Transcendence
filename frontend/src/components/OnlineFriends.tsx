import * as React from "react"
 
function OnlineFriends() {
  return (
    <>
        <div className='onlineFriends-div  pt-5 h-full'>
                    <div className='divs-online'>
                        <div className='bar-search-freinds'>
                            <input className='search-bar-div-friends'  placeholder='Search' />
                            <img style={{width: '15px', marginRight: '10px'}} className="size-image" src="/images/profileVector.svg" />
                            <img style={{width: '23px'}} className="size-image" src="/images/Settings.svg" />
                        </div>
                        <h3 className="font-semibold m-4 w-20 2xl:mx-7">Friends</h3>
                        <div className='online-users  px-4'>
                            <div className='each-user '>
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
                                
                            </div>
                            
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