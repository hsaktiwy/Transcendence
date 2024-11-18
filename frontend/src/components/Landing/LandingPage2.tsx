import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import CardBorder from "../../../public/cardBorder.png"
import TargetImage from "../../../public/target-front-color.png"
const LandingPage2 = () =>{

    return(
        <main className="bg-gradient-to-b from-[#070320] to-[#1a3340] font-poppins min-h-[100vh]">
            <section className="p-10 mx-auto container text-white flex flex-col gap-16 relative h-[100vh]">
                <NavBar/>
                <HeroSection/>
            </section>

            
        </main>
    )
}

export default LandingPage2