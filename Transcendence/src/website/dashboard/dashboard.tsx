import React from "react";
import './profile.css';
import SideBar  from'../profile/components-Profile/side-bar.tsx'
import SearchInfoProfile from '../profile/components-Profile/serach-infos-profile.tsx'
function Dashboard() {
    return (
        <>
            <div className="light-grid">
                <div id="home" className="main">
                    <div className="banner" role="banner">
                        <div className="screen">
                            <SideBar/>
                            <div className="search-info-profile">
                                <SearchNavBar/>
                                <ProfileSection/>
        <                   /div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default Dashboard