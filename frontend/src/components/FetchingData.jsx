import { useState, useEffect } from "react";

const ServerLink = "http://localhost:8000";

function FetchingData(TableName)
{
    let [Data, setData] = useState(null);
    useEffect(()=>{
      let URL = ServerLink + "/" + TableName;
      console.log(URL);
      Data = fetch(URL, {
        headers:
        {
          "Cookie" : "sessionid=mqtfpvlmlh6l5zvjvrq46fi6rq2zfyli",
        },
      }).then(
        res => {return res.json()}
      ).then(
        data => {setData(data)}
      ).catch(e => console.error(e));
    }, []);
    return (Data);
}

export default FetchingData;