import { Link } from "react-router-dom";

const Chess = ()=>
{
    return (
        <div className="bg-cover backdrop-blur-lg bg-center bg-[url('/images/chess_page.jpeg')] w-[100%] h-[100%] flex justify-center items-center  rounded-xl">
            <div className="w-full h-full bg-black/50 flex justify-center items-center text-white backdrop-blur-[2px]">
                <Link to='/game'> {"<//"} </Link>
            </div>
        </div>
    )
}

export default Chess;