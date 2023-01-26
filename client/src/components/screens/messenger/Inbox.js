import React from "react";
import Conversation from "./Conversations";
const Inbox = ()=>{
    return (

        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="search" placeholder="Search..." className="chatMenuInput" 
                    style={{width: "80%", padding: "10px", border: "1px solid grey", borderRadius: "5px", margin: '10px' }}/>
                    <Conversation/>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop"></div>
                    <div className="chatBoxBottom"></div>
                </div>
            </div>
            <div className="chat">
                <div className="chatWrapper"></div>
            </div>
        </div>
    );
};

export default Inbox

// export default function Inbox() {
//     return (

//         <div className="messenger">
//             hello!!!!
//         </div>
//     );
// }