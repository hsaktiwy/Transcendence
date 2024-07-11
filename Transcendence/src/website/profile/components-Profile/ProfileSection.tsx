import './style-component.css'

import ProfileOverView from './ProfileOverView'
import StatsComponent from './statsComponents'

function ProfileSection()
{
    return(
        <>
            <div className='ProfileSection lineUp'>
                <ProfileOverView/>
                <StatsComponent/>         
            </div>
        </>
        
    )
}

export default ProfileSection