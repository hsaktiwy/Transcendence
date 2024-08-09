import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import ChatSection from "./ChatSection";

import { BACKEND } from "../utils/Constants";
import mailman from "../utils/AxiosFetcher";
function Settings() {


    const [userData, setUserData] = useState<UserDataInterface | null>(null)
    interface UserDataInterface {
        login: string;
        firstName: string;
        lastName: string;
        profile_pic: string;
        email: string;
        password: string;
        birthDay: string;
        toFA: boolean;
        toFAPass: string;
    }
    const fetchUserData = async () =>{
        try{
            const req = {
                url: BACKEND + `api/user/${userContextConsumer?.id}/`,
                method: 'GET'
            }
            const resp = await mailman(req)
            const {
                login,
                firstName,
                lastName,
                profile_pic,
                email,
                password,
                birthDay,
                toFA,
                toFAPass
            } = resp.data
            console.log("sss ====???? ",resp.data)

            setUserData({
                login,
                firstName,
                lastName,
                profile_pic,
                email,
                password,
                birthDay,
                toFA,
                toFAPass
            })
            
        }
        catch (err){
            console.error("dddddd======????",err)
        }

    }
    const userContextConsumer = useContext(UserContext)
    if (!userContextConsumer)
        throw new Error("useUser must be used within a UserProvider");
    useEffect(() =>{
        fetchUserData()

    }, [userContextConsumer.id])
    return(

        <div className=" font-poppins absolute left-0 lg:left-[80px] top-[60px] w-[calc(100vw-20px)] lg:w-[calc(100vw-100px)] m-[10px] text-white bg-black/35 backdrop-filter backdrop-blur-sm  rounded-xl relattive">
                <div className="banner bg-gradient-to-b from-slate-300/10 to-cyan-500/10 h-[30vh] m-4 rounded-xl">
                </div>
                <div className="user-pic h-[120px] w-[120px] absolute top-[20vh] left-[50%] -translate-x-[50%] rounded-full border-[5px] border-white/50">
                    <img src={userData?.profile_pic} alt="user-pic" className="rounded-full object-cover"/>
                </div>
                <div className="settings-container flex flex-col lg:flex-row">
                    <div className="settings menu my-10 mx-4  flex flex-col items-center justify-start lg:justify-center ">
                        <ul className="flex flex-row lg:flex-col gap-8 flex-wrap items-center justify-center">
                            <li className="bg-gradient-to-b from-slate-300/10 to-cyan-500/10 py-2 px-6 rounded-xl hover:opacity-50 duration-200 cursor-pointer">General Settings</li>
                            <li className="bg-gradient-to-b from-slate-300/10 to-cyan-500/10 py-2 px-6 rounded-xl hover:opacity-50 duration-200 cursor-pointer">Security Settings</li>
                        </ul>
                    </div>
                    <div className="general-settings mt-10 flex-1 bg-red-500">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maxime earum aut commodi quisquam. Dicta suscipit sapiente inventore cumque, laboriosam soluta hic velit praesentium. Ipsum assumenda voluptatum officiis deleniti vero?
                        Perspiciatis nisi qui magni quia voluptatem enim illum. Accusamus voluptatum dignissimos inventore aspernatur ullam dolor, ducimus incidunt nihil, explicabo, numquam quidem architecto dolorem possimus soluta facere illo a id quasi?
                        Recusandae, eum, dolorum labore at necessitatibus veniam hic doloribus ipsum id porro ullam! Ipsam exercitationem ipsum itaque, dignissimos, dolorem architecto similique eligendi hic obcaecati consectetur, sunt laboriosam! Minima, nam alias.
                        Tempore, sapiente ab perspiciatis hic in, odit cum quo earum, quisquam nemo saepe nisi veritatis possimus voluptates. Provident amet debitis similique repellendus aut officiis unde sint quos mollitia, nulla omnis?
                        Ab atque beatae necessitatibus alias quam harum vel eligendi, aspernatur nesciunt officiis! Laborum at commodi, similique neque rem sapiente delectus ut deleniti odit fuga earum veritatis quod impedit, dolorem sed.
                        Odio pariatur molestias a quam earum iure commodi, suscipit voluptates quaerat numquam blanditiis, impedit tempora illum quasi cum. Illo excepturi adipisci dolor quas quam dicta, qui accusamus vitae eum voluptate.
                        Tenetur fugit porro qui eum reprehenderit quidem dolorem adipisci odio ea dicta nisi, repellat, in similique, tempore nulla necessitatibus eligendi a aut labore saepe beatae omnis optio magnam! Repellat, soluta?
                        Iure, adipisci totam id quia sint suscipit aspernatur assumenda fuga quo ex maxime iste vel, laborum provident itaque repudiandae eius? Ducimus adipisci vel architecto accusantium molestias voluptatum rerum ratione provident?</p>
                    </div>
                </div>

        </div>
    )
}

export default Settings