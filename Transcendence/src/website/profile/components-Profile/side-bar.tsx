import React from "react";
import './style-component.css'

function sideBar()
{
    return(
        <div className="side-bar-div lineRight">
            <div className="side-bar-div-grid logo-center">
                <img src="/images/Logo.svg" />
            </div>
            <div className="side-bar-div-grid center-sid-bar">
                <div className="div-side-bar-icon">
                    <img className="size-image-bar" src="/images/Home.svg" />
                    <h1 style={{fontWeight: '400'}} >Home</h1>
                </div>
                <div className="div-side-bar-icon">
                    <img className="size-image-bar" src="/images/Vector.svg" />
                    <h1 style={{fontWeight: '400'}} >Profile</h1>
                </div>
                <div className="div-side-bar-icon">
                    <img className="size-image-bar" src="/images/Message.svg" />
                    <h1 style={{fontWeight: '400'}} >Chat  '</h1>
                </div>
                <div className="div-side-bar-icon">
                    <img className="size-image-bar" src="/images/pong_.svg" />
                    <h1 style={{fontWeight: '400'}} >Game</h1>
                </div>
            </div>
            <div className="side-bar-div-grid log-out">
                <img src="/images/log-out.svg" />
            </div>
        </div>
    )
}
export default sideBar