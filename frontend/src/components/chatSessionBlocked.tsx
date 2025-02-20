import { BsShieldLock } from "react-icons/bs";

function ChatSessionBlocked(){
    return (
        <div className="absolute h-full w-full  left-0 top-0 flex justify-center items-center flex-col gap-4">
            <span className="text-[85px] text-white/90">
                <BsShieldLock/>
            </span>
            <h1 className="text-2xl font-semibold text-white/85">Something went wrong</h1>
            <p className="text-lg text-white/75">You can't see this conversation</p>
        </div>
    )
}
export default ChatSessionBlocked