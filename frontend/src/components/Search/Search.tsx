import mailman from "@/utils/AxiosFetcher";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
interface props{
    search_for:string
}

interface User
{
    login : string,
    firstName : string,
    lastName : string,
    profile_pic : string,
    lastElm: boolean
}

interface searched_data
{
    data : User[]
}

function Search(info:props) {
    const [data, setData] = useState<JSX.Element[]>()
    const [loading, setLoading] = useState<boolean>(true)


    // i want to use use effect to search for users that matched the string i will gave
    useEffect(()=>{
        const GetMatchs = async ()=>
        {
            try
            {
                // i think we will need a parsing for this
                console.log('searching ... ')
                const request = {
                    url: '/api/user/search/',
                    method: 'GET',
                    withCredentials: true,
                    params:{
                        search: info.search_for
                    }
                }
                const resp = await mailman(request)
                const sd : searched_data = resp.data as searched_data
                const userComponents = sd.data?.map((user, index) => {

                    
                        const isLast : boolean = index === sd.data.length-1 ? true : false 
                        return(

                            <SearchDisplay
                            key={index+1}
                            login={user.login}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            profile_pic={user.profile_pic}
                            lastElm={isLast}
                            />
                        )
                    }
                );
                 
                    setLoading(false)
                setData(userComponents)
                console.log(resp.data)
                // convert strings to array of searchObject
            }catch (e){
                console.error(e)
            }
        }
        console.log(info.search_for)
        GetMatchs();
    },[info.search_for])
    // they cercle that array and display in reac compoenent format
            // the react component that will hold that user will be in link format so that it will direct to it profile
    // return that to the search bare
    return (
        <div className={`${loading ? 'flex flex-col justify-center items-center h-[100px]' : 'h-full'} w-full   `}>

        {
            loading 
            ? <div className="flex justify-center items-center h-full w-full ">
                <div className="w-12 h-12 border-4 border-[#fafcfc] border-solid border-t-transparent rounded-full animate-spin"></div>
            </div> 
            : <div>
                {/* <div>{search_for}</div> */}
               {data}
            </div>

        }
        </div>
  )
}

export default Search;