import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from '../../App'
import axios from "axios";
import MessengerApi from "./MessengerApi.js";
import ConversationApi from "../ConversationApi.js";

const Messenger = ()=>{ 
  const { state } = useContext(UserContext); 
  const [currentChat, setCurrentChat] = useState();
  const [friends, setFriends] = useState([]);
 

useEffect(() => { 
  console.log(state);
  const getFriends = async () => {
    try {
    const res = await axios.get("/friends/" + state._id);
    setFriends(res.data);
  } catch (err) {
    console.log(err);
  }};
  getFriends(); 
}, [state]);


  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper" style={{"border": "1px solid grey"}}>
            {
              friends.map((c) => ( 
                <div onClick={() => {setCurrentChat(c);console.log(currentChat)} } key={c._id}> 
                  <ConversationApi friend={c}/>
                </div>
              ))
            }
          </div>
        </div>
        <div className="chatBox" style={{"border": "1px solid grey"}}>
          <div className="chatBoxWrapper">
            {currentChat ? ( 
    
                <div>
                  <MessengerApi friend={currentChat}/>
                </div>
        
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
       </div>
    </>
  );
}

export default Messenger