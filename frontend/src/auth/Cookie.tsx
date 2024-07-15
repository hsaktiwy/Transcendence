
export const getCookie = (name: string) : string =>{
    const cookie = document.cookie.split(';').find((line) => line.startsWith(name+"="));
    console.log("cookie : ", document.cookie)
    return (cookie ? cookie.split("=")[1] : "")
}

export const setCookie = (name:string, value:string, live:number) : void =>
{
    const expire = new Date();
    expire.setDate(expire.getDate() + live)
    document.cookie = `${name}=${value}; expires=${expire.toUTCString()}; path=/`
}