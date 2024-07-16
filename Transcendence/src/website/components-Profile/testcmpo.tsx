import React from "react";
import './style-component.css'

function testcmpo()
{
    return(
        <>
            {/* <div className="h-screen  sm:flex justify-evenly items-center  "> */}
            {/* <div className="h-screen   grid items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-4"> */}
            {/* <div className="h-screen   grid  grid-cols-1 md:grid-cols-2 md:text-left md:items-center">
                    <div className="card">
                        <img className="w-full" src="../../../public/images/musashi-miyamoto-from-vagabond-v0-o83baybb71oc1.png"/> 
                        <div className="m-4">
                        <p className="w-30 font-semibold">Musashi Miyamoto</p>
                        <p className="w-30 font-normal  text-sm">Samurai</p>
                        </div>
                        <div className="badge">
                        <span>Character</span>
                        </div>
                        </div>
                        <div>
                        <h1>Musachi  Miyamoto</h1>
                        <p>dustry. Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took
                        a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into 
                        versions of Lorem Ipsum</p>
                        </div>
                        
                    </div> */}
        
            <div className="grid gap-8 justify-center text-center sm:grid-cols-2 sm:items-center sm:text-left">

                    <img className="mx-auto rounded-lg " src="../../../public/images/musashi-miyamoto-from-vagabond-v0-o83baybb71oc1.png"/> 
                    <div >
                    <h1 className="text-4xl font-medium ">Musachi  Miyamoto</h1>
                    <p>dustry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took
                    a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into 
                    versions of Lorem Ipsum</p>
                </div>
            </div>
        </>
    )
}
export default testcmpo 