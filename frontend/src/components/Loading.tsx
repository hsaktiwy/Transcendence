import {motion, stagger, useScroll} from 'framer-motion';

const LoadingIndecator = () =>
{

    const loadingContainerVariants = {
        start : {
            transition : {
                staggerChildren : 0.1
            }
        },
        end : {
            transition : {
                staggerChildren : 0.1
            }
        }
    }
    const loadingCercleVariants = {
        start : {
            y: '0%'
        },
        end : {
            y : '100%'
        }
    }
    const loadingCercleTransition = {
        duration : 0.4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease : 'easeInOut'
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <motion.div variants={loadingContainerVariants} initial='start' animate='end' className='loading-container flex gap-4'>
                <motion.div variants={loadingCercleVariants} transition={loadingCercleTransition} className='w-[20px] h-[20px] rounded-full bg-white'></motion.div>
                <motion.div variants={loadingCercleVariants} transition={loadingCercleTransition} className='w-[20px] h-[20px] rounded-full bg-white'></motion.div>
                <motion.div variants={loadingCercleVariants} transition={loadingCercleTransition} className='w-[20px] h-[20px] rounded-full bg-white'></motion.div>
            </motion.div>
        </div>
    )
}

export default LoadingIndecator;