import './style-component.css'

function SearchNavBar()
{
    return(
        <>
            <div className='SearchNavBar mb-12  lineDown '>
                <div className='search-bar-div'>
                    <input className='search-bar' type='text' placeholder='Search'/>
                </div>

                <div className='nav-bar-div'>
                    <div className='nav-bar'>
                        <img className="size-image" src="/images/Notification.svg" />
                        <img className="size-image" src="/images/Message.svg" />
                        <img style={{width: '40px'}} className="size-image" src="/images/Frame 30.png" />
                        <img style={{width: '30px'}} src="/images/Downarrow.svg" />
                    </div>
                </div>      
            </div>
        </>
        
    )
}
export default SearchNavBar