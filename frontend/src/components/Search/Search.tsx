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
    profile_pic : string
}

interface searched_data
{
    data : User[]
}

function Search(info:props) {
    const [data, setData] = useState<JSX.Element[]>()


    // i want to use use effect to search for users that matched the string i will gave
    useEffect(()=>{
        const GetMatchs = async ()=>
        {
            try
            {
                // i think we will need a parsing for this
                console.log('searching ... ')
                const request = {
                    url: '/api/users/search/'+info.search_for,
                    method: 'GET',
                    withCredentials: true,
                }
                const resp = await mailman(request)
                const sd : searched_data = resp.data as searched_data
                const userComponents = sd.data?.map((user) => (
                    <SearchDisplay
                      login={user.login}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      profile_pic={user.profile_pic}
                    />
                  ));
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
    return (<>
        <div>
            {/* <div>{search_for}</div> */}
            <div>{data}</div>
        </div>
    </>)
}

export default Search;