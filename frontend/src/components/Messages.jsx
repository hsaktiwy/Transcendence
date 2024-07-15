import './Messages.css';
import FetchingData from './FetchingData';

function compareTimestamp(timestamp) {
    // Convert the timestamp to a Date object
    const messageDate = new Date(timestamp);
    
    // Get the current date and time
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMs = currentDate - messageDate;
    
    // Convert milliseconds to a more readable format
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    return {
        diffInMs,
        diffInSeconds,
        diffInMinutes,
        diffInHours,
        diffInDays
    };
}

const Messages = () => {
    const Data = FetchingData("chat/message/1");

    if (Data == null)
    {
        return (
            <div className="no-data-message">Data not found!</div>
        );
    }
    
    const messages = Data.map(message =>
    (
        <div key={message.messageId} className="messageWrapper">
            <div className='Centering LiveChat_avatar'>
                <img  src={message.senderImage} className='avatar'/>
            </div>
            <div className='Info'>
                <div className='senderName Baselining_contnet'>
                    {message.senderName}
                </div>
                <div className='TheMessage Baselining_contnet'>
                    {message.text}
                </div>
            </div>
            <div>
                {()=>{
                    var date = compareTimestamp(message.timestamp);
                    return (
                        (date.diffInDays > 0) ? date.diffInDays + "day ago"
                            : ((date.diffInHours > 0) ? date.diffInHours + "hr ago"
                            : (date.diffInDays.diffInMinutes > 0 ? date.diffInMinutes + "min ago"
                            : (date.diffInSeconds > 0 ? date.diffInSeconds + "s ago" : "just now")
                            )))
                }}
            </div>
        </div>
    ));

    return (
        <div className='Messages'>
            {messages}
        </div>
    );
}

export default Messages;