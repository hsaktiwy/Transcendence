import React from "react";
import './profile.css';
import SideBar  from'../components-Profile/side-bar.tsx'
import SearchInfoProfile from '../components-Profile/serach-infos-profile.tsx'
function Profile() {
    return (
        <>
                <div id="home" className="main">
                    <div className="banner" role="banner">
                        <div className="screen">
                            <SideBar/>
                            <SearchInfoProfile/>
                        </div>
                    </div> 
                </div>
        </>
    );
}

export default Profile;