import React from "react";
import './style-component.css'

function sideBar()
{
    return(
        <div className="w-36  min-w-[200px]">
            <div className="  side-bar-div  lineRight">
                <div className="side-bar-div-grid  logo-center">
                    <img className="" src="/images/Logo (1).svg" />
                </div>
                <div className="side-bar-div-grid center-sid-bar">
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar " src="/images/Home.svg" />
                    </div>
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar " src="/images/Message.svg" />
                    </div>
                    <div className="div-side-bar-icon">
                        <img className="w-9 md:size-image-bar " src="/images/pong_.svg" />
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