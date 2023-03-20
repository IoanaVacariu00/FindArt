import React,{ useEffect, useState, useRef, useContext } from 'react';      
import Talk from 'talkjs';   
import { UserContext } from '../../App';
const MessengerApi = () => {   
  
    const {state,dispatch} = useContext(UserContext); 
    const chatboxEl = useRef();

       // wait for TalkJS to load
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
  
        const otherUser = new Talk.User({
          id: '63da59c7008bff35b0903987',
          name: 'irina',
          email: 'elena_vacariu@gmail.com',
          photoUrl: '/images/image.jpg',         
          role: 'default',
        });
  
        const session = new Talk.Session({
          appId: 'tyqvYB21',
          me: currentUser,
        });
  
        const conversationId = Talk.oneOnOneId(currentUser, otherUser);
        const conversation = session.getOrCreateConversation(conversationId);
        conversation.setParticipant(currentUser);
        conversation.setParticipant(otherUser);
  
        const chatbox = session.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(chatboxEl.current);
  
        return () => session.destroy();
      }
    }, [talkLoaded]);
  
    return <div id="chat_box" ref={chatboxEl} />;
} 

export default MessengerApi  