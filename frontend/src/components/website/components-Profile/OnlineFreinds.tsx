import './style-component.css'

function OnlineFriends()
{
    return(
        <>
            <div className='onlineFriends-div'>
                <div className='divs-online'>
                    <div className='bar-search-freinds'>
                        <input className='search-bar-div-friends'  placeholder='Search' />
                        <img style={{width: '15px', marginRight: '10px'}} className="size-image" src="/images/profileVector.svg" />
                        <img style={{width: '23px'}} className="size-image" src="/images/Settings.svg" />
                    </div>
                    <h3 style={{fontWeight: '500', margin:'10px 15px'}}>Friends</h3>
                    <div className='online-users'>
                        <div className='each-user'>
                            <img style={{width: '48px'}} className="size-image" src="/images/Frame 28 (1).svg" />
                            <div style={{padding: '10px'}}>
                                <h1 style={{fontWeight: '500', fontSize: '15px'}}>Hamza Chahbooune</h1>
                                <h1 style={{fontWeight: '200', fontSize: '10px'}}>@hachahbo</h1>
                            </div>
                            <div className='is-online'>
                                <div className='green-dot'></div>
                            </div>
                            
                        </div>
                        <div className='each-user'>
                            <img style={{width: '48px'}} className="size-image" src="/images/Frame 28 (1).svg" />
                            <div style={{padding: '10px'}}>
                                <h1 style={{fontWeight: '500', fontSize: '15px'}}>Hamza Chahbooune</h1>
                                <h1 style={{fontWeight: '200', fontSize: '10px'}}>@hachahbo</h1>
                            </div>
                            <div className='is-online'>
                                <div className='green-dot'></div>
                            </div>
                            
                        </div>
                        <div className='each-user'>
                            <img style={{width: '48px'}} className="size-image" src="/images/Frame 28 (1).svg" />
                            <div style={{padding: '10px'}}>
                                <h1 style={{fontWeight: '500', fontSize: '15px'}}>Hamza Chahbooune</h1>
                                <h1 style={{fontWeight: '200', fontSize: '10px'}}>@hachahbo</h1>
                            </div>
                            <div className='is-online'>
                                <div className='green-dot'></div>
                            </div>
                            
                        </div>
                        <div className='each-user'>
                            <img style={{width: '48px'}} className="size-image" src="/images/Frame 28 (1).svg" />
                            <div style={{padding: '10px'}}>
                                <h1 style={{fontWeight: '500', fontSize: '15px'}}>Hamza Chahbooune</h1>
                                <h1 style={{fontWeight: '200', fontSize: '10px'}}>@hachahbo</h1>
                            </div>
                            <div className='is-online'>
                                <div className='green-dot'></div>
                            </div>
                            
                        </div>
                        <div className='each-user'>
                            <img style={{width: '48px'}} className="size-image" src="/images/Frame 28 (1).svg" />
                            <div style={{padding: '10px'}}>
                                <h1 style={{fontWeight: '500', fontSize: '15px'}}>Hamza Chahbooune</h1>
                                <h1 style={{fontWeight: '200', fontSize: '10px'}}>@hachahbo</h1>
                            </div>
                            <div className='is-online'>
                                <div className='green-dot'></div>
                            </div>
                            
                        </div>
                        <div className='each-user'>
                            <img style={{width: '48px'}} className="size-image" src="/images/Frame 28 (1).svg" />
                            <div style={{padding: '10px'}}>
                                <h1 style={{fontWeight: '500', fontSize: '15px'}}>Hamza Chahbooune</h1>
                                <h1 style={{fontWeight: '200', fontSize: '10px'}}>@hachahbo</h1>
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