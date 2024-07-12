import './style-component.css'

function ProfileOverView()
{
    return(
        <>
            <div className='profileinfos-div'>
                    <div className='profileinfos'>
                        <div className='profile-img'>
                            <img className="img-player" src="/images/Frame 28.svg" />
                        </div>
                        <div className='stats-profile'>

                            <div className='stats-profile-info'>
                                <div className='rank'>
                                    <img className="size-image" src="/images/Crown.svg" />
                                    <b>#1</b>
                                </div  >
                                    <div className='collect-cols'>
                                        <div className='div-col-stats'>100 Game Played</div>
                                        <div className='div-col-stats'>50 Game Won</div>
                                        <div className='div-col-stats'>50 Game Lose</div>
                                        <div className='div-col-stats'>50% Win Rate</div>
                                    </div>
                                        <button style={{backgroundColor: '#5E97A9', cursor:'pointer', margin:'auto'}} className='div-col-stats'>Connect</button>
                            </div>
                        </div>
                    </div>
                </div >
        </>
    )
}

export default ProfileOverView