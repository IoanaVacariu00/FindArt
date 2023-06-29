
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../App'
import Talk from 'talkjs';  

const Messenger = ()=>{   

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
      inbox.mount(document.getElementById('talkjs-container'));
      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (<div className='chat_box' id="talkjs-container"><div className='noContent'>Loading...</div></div>);
}    

export default Messenger 

  