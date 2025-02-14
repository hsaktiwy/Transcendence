import { Link } from "react-router-dom"

const PageNotFound = ()=>{
    return(
        <div className="w-[100vw] h-[100vh] bg-black/20 backdrop-blur-sm flex justify-center items-center text-white font-poppins">
            <div className="max-w-screen-xl flex  items-center  justify-center flex-col lg:flex-row px-8 gap-5 lg:gap-0">
                <img src="/404.png" alt="404-image" />
                <div className="flex flex-col gap-4 self-start lg:self-center">
                    <h1 className="text-5xl font-bold">Oops!</h1>
                    <p className=" text-white/50 text-lg font-semibold">We couldn't find the page you are looking for</p>
                    <Link to='/' className="py-3  bg-gradient-to-r from-[#5e97a9] to-[#0e769f] lg:w-[195px] font-medium rounded-full text-center opacity-85 hover:opacity-100 duration-75 cursor-pointer text-xl tracking-widest">
                            Go Back Home
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PageNotFound