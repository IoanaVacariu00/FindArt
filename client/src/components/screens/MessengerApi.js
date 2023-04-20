import React,{ useEffect, useState, useRef, useContext } from 'react';      
import Talk from 'talkjs';   
import { UserContext } from '../../App';
const MessengerApi = ({friend}) => {   
  
    const {state} = useContext(UserContext);               
    const chatboxEl = useRef();  
    const [talkLoaded, markTalkLoaded] = useState(false);
  
    useEffect(() => {
      Talk.ready.then(() => markTalkLoaded(true));
      if (talkLoaded) { console.log("loaded");
        const currentUser = new Talk.User({
          id: state._id,
          name: state.name,
          email: state.email,
          photoUrl: state.pic,
          role: 'default',
        });
  
        const otherUser = new Talk.User({
          id: friend._id,
          name: friend.name,
          email: friend.email,
          photoUrl: friend.pic,
          role: 'default',
        });
  
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
        const conversationId = Talk.oneOnOneId(currentUser, otherUser);
        const conversation = session.getOrCreateConversation(conversationId);
        // const conversation = window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(currentUser);
        conversation.setParticipant(otherUser);
  
        const chatbox = session.createChatbox();
        // const chatbox = window.talkSession.createChatbox();
        const inbox = session.createInbox();
        inbox.select(conversation);
        inbox.mount(document.getElementById('talkjs-container'));
        // chatbox.select(conversation);
        // chatbox.mount(chatboxEl.current);
  
        return () => session.destroy();
      }
    }, [talkLoaded]);
  // ref={chatboxEl}
    return <div className='chat_box' id="talkjs-container" />;
} 

export default MessengerApi  