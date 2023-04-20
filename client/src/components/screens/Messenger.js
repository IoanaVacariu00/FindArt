
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from '../../App'

// import axios from "axios";
// import MessengerApi from "./MessengerApi.js";
// import ConversationApi from "../ConversationApi.js";
import Talk from 'talkjs';  

const Messenger = ({other})=>{ 
  const { state } = useContext(UserContext); 

  // const [currentChat, setCurrentChat] = useState();
  // const [friends, setFriends] = useState([]);
 

// useEffect(() => { 
//   console.log(state);
//   const getFriends = async () => {
//     try {
//     const res = await axios.get("/friends/" + state._id);
//     setFriends(res.data);
//   } catch (err) {
//     console.log(err);
//   }};
//   getFriends(); 
// }, [state]);
const [talkLoaded, markTalkLoaded] = useState(false);

useEffect(() => {
  Talk.ready.then(() => markTalkLoaded(true));
  if (talkLoaded) { 
    const currentUser = new Talk.User({
      id: state._id,
      name: state.name,
      email: state.email,
      photoUrl: state.pic,
      role: 'default',
    });

    // const otherUser = new Talk.User({
    //   id: friend._id,
    //   name: friend.name,
    //   email: friend.email,
    //   photoUrl: friend.pic,
    //   role: 'default',
    // });

    const session = new Talk.Session({
      appId: 'tyqvYB21',
      me: currentUser,
    });
  //   if (!window.talkSession) {
  //     window.talkSession = new Talk.Session({
  //         appId: "tyqvYB21",
  //         me: currentUser
  //     });
  // }
    // const conversationId = Talk.oneOnOneId(currentUser, otherUser);
    // const conversation = session.getOrCreateConversation(conversationId);
    // // const conversation = window.talkSession.getOrCreateConversation(conversationId);
    // conversation.setParticipant(currentUser);
    // conversation.setParticipant(otherUser);

    // const chatbox = session.createChatbox();
    // const chatbox = window.talkSession.createChatbox();
    const inbox = session.createInbox();
    if(other!='') {
      const friend = User.find(user => user.id === other);
      const otherUser = new Talk.User({
        id: friend._id,
        name: friend.name,
        email: friend.email,
        photoUrl: friend.pic,
        role: 'default',
    });
    const conversationId = Talk.oneOnOneId(currentUser, otherUser);
    const conversation = session.getOrCreateConversation(conversationId);
    inbox.select(conversation);
    }
      
    inbox.mount(document.getElementById('talkjs-container'));
    // chatbox.select(conversation);
    // chatbox.mount(chatboxEl.current);

    return () => session.destroy();
  }
}, [talkLoaded]);
  return (
    <>
      <div className='chat_box' id="talkjs-container" >Loading...</div>
    </>
  );
}

export default Messenger 

  {/* //   //     return ; */}
  {/* //     <div className="messenger">
  //       <div className="chatMenu">
  // <div className="chatMenuWrapper" style={{"border": "1px solid grey"}}>*/}
             {/* //  { */}
  {/* //           //   friends.map((c) => ( 
  //           //     <div onClick={() => {setCurrentChat(c)} } key={c._id}> 
  //           //       <ConversationApi friend={c}/>
  //           //     </div>
  //           //   ))
  //           // }  */}
  //         {/* </div>
  //       </div> */} 
  //       {/* <div style={{"border": "1px solid grey"}}>
  //         <div > */}
  //           {/* {currentChat ?  
  //             <div>
  //               <MessengerApi friend={currentChat}/>
  //             </div>
  //               :
  //             <span className="noConversationText">
  //               Open a conversation to start a chat.
  //             </span>
  //           } */}
  //         {/* </div>
  //       </div>
  //      </div> */}