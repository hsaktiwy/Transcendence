import React, { useEffect } from "react";

import { useState } from "react";
import { NotificationPropreties } from "./UserContext";

interface NotificationsList{
    items: NotificationPropreties[]
}
const NotificationToast: React.FC<NotificationsList> = ({ items }) =>{

    useEffect(() =>{
        console.log(items)
    }, [])
    return(
        <div className="animate-notificationAnimation fixed z-50  text-white bottom-0 right-0  text-2xl  text-center  flex flex-col gap-4">
  
        {
                    items.map((item, index) =>{
                        return(
                        <div key={index} className="shadow-[0px_20px_207px_10px_rgba(94,_151,_169,_0.35)] animate-notificationAnimation w-[300px] h-[120px] bg-[#1b1b1b] rounded-lg">
                            {item.content}
                        </div>
                        )
                    })
        }

        </div>
    )
}

export default NotificationToast