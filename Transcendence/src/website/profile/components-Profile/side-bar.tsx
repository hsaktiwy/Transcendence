import React from "react";
import './style-component.css'

function sideBar()
{
    return(
        <div className="side-bar-div">
            <div className="side-bar-div-grid logo-center">
                <img src="/images/Logo.svg" />
            </div>
            <div className="side-bar-div-grid center-sid-bar">
                <img className="size-image" src="/images/Home.svg" />
                <img className="size-image" src="/images/Vector.svg" />
                <img className="size-image" src="/images/pong_.svg" />
            </div>
            <div className="side-bar-div-grid log-out">
                <img src="/images/log-out.svg" />
            </div>
        </div>
    )
}
export default sideBar