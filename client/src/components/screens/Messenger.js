
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from '../../App'
import Talk from 'talkjs';  

const Messenger = ({other})=>{   
  console.log(other);
  const { state } = useContext(UserContext); 
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
    
    const session = new Talk.Session({
      appId: 'tyqvYB21',
      me: currentUser,
    });

    const inbox = session.createInbox();
        if(other) {
          const otherUser = new Talk.User({
            id: other._id,
            name: other.name,
            email: other.email,
            photoUrl: other.pic,
            role: 'default',
        });

    const conversationId = Talk.oneOnOneId(currentUser, otherUser);
    const conversation = session.getOrCreateConversation(conversationId);
    inbox.select(conversation);
    } 
     
    inbox.mount(document.getElementById('talkjs-container'));

    return () => session.destroy();
  }
}, [talkLoaded]);
  return (
    <>
      <div className='chat_box' id="talkjs-container">Loading...</div>
    </>
  );
}

export default Messenger 

  