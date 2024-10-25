
import { axiosPath } from "@/utils/Constants"
import { Link } from 'react-router-dom'
interface props
{
    login : string,
    firstName : string,
    lastName : string,
    profile_pic : string
}

function SearchDisplay({login, firstName, lastName, profile_pic}:props)
{
    console.log("in searchDisplay",  login)
    return (
        <>
            <Link to={`/profile/${login}`}>
                <div className={`font-poppins border-b-[1px] border-[#5E97A9]/85 min-h-[100px] bg-slate-600`}>
                    <div className="px-2 sm:px-4 py-4 flex gap-8 items-center  justify-center sm:justify-between flex-wrap ">
                        <div className="  w-[60px] h-[60px] relative ">
                            <img src={`${axiosPath}${profile_pic}`} alt="test" className=" rounded-full border-[1px] border-white/25 h-full w-full object-cover"/>
                        </div>
                        <div className="flex flex-col gap-4 items-center sm:items-start overflow-visible">
                            <h1 className="text-sm sm:text-base font-medium text-center sm:text-start w-[250px] sm:w-[300px] text-white tracking-wide">
                                {login}
                            </h1>
                            <div className="flex justify-between gap-8">
                                <div className="text-white text-sm">{firstName}</div>
                                <div className="text-white text-sm">{lastName}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default SearchDisplay;