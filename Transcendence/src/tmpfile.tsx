import { useState } from 'react'
import './website/components-Profile/style-component.css'
import { AnimatePresence, easeInOut, motion, MotionConfig, useAnimationControls } from "framer-motion"

function Tmpfile()
{
    // const [isVisible, setVisible] = useState(true)
    // const controls = useAnimationControls()
    // const handleClick = () =>
    //     {
    //         controls.start("flip")
    //     }
    return(
        <>
        {/* <motion.div className='flex justify-center flex-col h-screen  items-center'>
            <motion.button  onClick={()=> setVisible(!isVisible) }
            className='size-44 h-[10%] border rounded-2xl font-bold '>Click</motion.button>
            <AnimatePresence mode="popLayout" >
            
            {isVisible && <motion.div
                initial={{
                    rotate: '0deg',
                    scale: 0,
                    y: 0,
                }} 
                animate={{
                    
                    rotate: '360deg',
                    scale: 1,
                    y: [0, 10, -150, 0],
                }}
                exit={{
                    
                    rotate: '360deg',
                    scale: 0,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    ease: "backInOut",
                    // times: [0, 0.25, 0.5, 0.85]
                }}
                className='border size-96'>
                </motion.div>}  
                </AnimatePresence>
                
            </motion.div> */}
            {/* ---------------------------------*/}
            {/* <motion.div className='flex  gap-5 justify-center flex-col h-screen  items-center'>
            <MotionConfig
            transition={{
                duration: 0.124,
                ease: "easeInOut",
            }}
            >
            <motion.button
            whileHover={{ scale: 1.05}}
            whileTap={{scale: 0.95, rotate: "2deg"}}
            className='size-44 h-[10%] border rounded-2xl font-bold '>Click</motion.button>
            <motion.button
            whileHover={{ scale: 1.05}}
            whileTap={{scale: 0.95, rotate: "-2deg"}}
            
            className='size-44 h-[10%] border rounded-2xl font-bold '>Click</motion.button>

            </MotionConfig>
            
            </motion.div> */}
            {/* --------------------------------- */}
            {/* <motion.div className='flex justify-center flex-col h-screen  items-center'>
            <motion.button onClick={handleClick}
             className='size-44 h-[10%] border rounded-2xl font-bold '>Click</motion.button>
            <motion.div
                variants={{
                    initial :{
                        
                        rotate: '0deg'
                    },
                    flip:
                    {
                        rotate: "180deg",
                    },
                    
                }}
                // whileHover="flip"
                initial="initial"
                animate={controls}
                className='m-5  rounded-3xl bg-gray-500 size-96'>
                </motion.div>  
            </motion.div> */}
            {/* --------------------------------- */}
            <div style={{height: "150vh", background: "white"}} />
                <motion.div 
                    style={{height: "100vh", background: "black"}}
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 3}}
                />
        </>
    );
};

export default Tmpfile