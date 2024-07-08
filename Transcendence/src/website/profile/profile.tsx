import React from "react";
import './profile.css';
import SideBar  from'./components-Profile/side-bar.tsx'
import SearchInfoProfile from './components-Profile/serach-infos-profile.tsx'
function Profile() {
    return (
        <>
    <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
    Save changes
    </button>       
            <div className="light-grid">
    <div id="home" className="main">
                    <div className="banner" role="banner">
                        <div className="screen">
                            <SideBar/>
                            <SearchInfoProfile/>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default Profile;