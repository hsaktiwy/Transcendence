
// import { axiosPath } from "@/utils/Constants"
import { VITE_BACKEND } from '@/utils/interfaces';
import { customSubString } from '@/utils/textFromatting';
import { Link } from 'react-router-dom'
interface props
{
    unique_id: string,
    login : string,
    firstName : string,
    lastName : string,
    profile_pic : string,
    lastElm: boolean
}

function SearchDisplay({unique_id,login, firstName, lastName, profile_pic, lastElm}:props)
{
    return (
        <>
            <Link to={`/profile/${unique_id}`}>
                <div className={`font-poppins ${lastElm === false && 'border-b-[1px] border-[#5E97A9]/85'} min-h-[100px] `}>
                    <div className="px-2 sm:px-4 py-4 flex gap-8 items-center  justify-center  flex-wrap ">
                        <div className="  w-[60px] h-[60px] relative ">
                            <img src={`${VITE_BACKEND}${profile_pic}`} alt="test" className=" rounded-full border-[1px] border-white/25 h-full w-full object-cover"/>
                        </div>
                        <div className="flex flex-col gap-3 items-center sm:items-start overflow-visible">
                            <p>{customSubString(firstName+" "+lastName)}</p>
                            <h1 className="text-sm sm:text-base font-medium text-center sm:text-start w-[250px] sm:w-[300px] text-white tracking-wide">
                                {`@${login}`}
                            </h1>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default SearchDisplay;