import React from "react";
import './style-component.css'

function sideBar()
{
    return(
        <div className="border w-1/5 max-w-64 min-w-[200px]">
            <div className="side-bar-div lineRight">
                <div className="side-bar-div-grid  logo-center">
                    <img className="" src="/images/Logo (1).svg" />
                </div>
                <div className="side-bar-div-grid center-sid-bar">
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar " src="/images/Home.svg" />
                        <h1 style={{fontWeight: '400'}} className="hidden md:block pl-2" >Home</h1>
                    </div>
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar "  src="/images/profileVector.svg" />
                        <h1 style={{fontWeight: '400'}} className="hidden md:block pl-2">Profile</h1>
                    </div>
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar " src="/images/Message.svg" />
                        <h1 style={{fontWeight: '400'}} className="hidden md:block pl-2">Chatt</h1>
                    </div>
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar " src="/images/pong_.svg" />
                        <h1 style={{fontWeight: '400'}} className="hidden md:block pl-2">Game</h1>
                    </div>
                </div>
                <div className="side-bar-div-grid log-out">
                    <img src="/images/log-out.svg" />
                </div>
            </div>

        </div>
    )
}
export default sideBar