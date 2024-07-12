import React from "react";
import '../profile/profile.css';
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchNavBar from '../components-Profile/nav-bar-search.tsx'
import StatsComponent from '../components-Profile/statsComponents.tsx'
import OnlineFriends from "../components-Profile/OnlineFreinds.tsx";
function Dashboard() {
    return (
        <>
            {/* <div className="light-grid"> */}
                <div id="home" className="main">
                    <div className="banner" role="banner">
                        <div className="screen">
                            <SideBar/>
                            <div className="search-info-profile">
                                <SearchNavBar/>
                                <div className='ProfileSection lineUp'>
                                    <StatsComponent/>
                                    <OnlineFriends/>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            {/* </div> */}
        </>
    );
}

export default Dashboard