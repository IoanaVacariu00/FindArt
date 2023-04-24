import React,{ useEffect, useState, useContext } from 'react';      
import Talk from 'talkjs';   
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
const MessengerApi = () => {   
    const [friend,setFriend] = useState(null);
    const {state} = useContext(UserContext); 
    const {userid} = useParams();   
    const [talkLoaded, markTalkLoaded] = useState(false);
    console.log(talkLoaded);
    useEffect(()=>{
      console.log("1");
      // Talk.ready.then(() => markTalkLoaded(true));
      // if (talkLoaded) {
      fetch(`/finduser/${userid}`,
      {
          headers:{
              "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      }
      ).then(res=>res.json())
       .then(result=>{
        setFriend(result); 
    })
  // }talkLoaded

   },[])

   console.log( friend);
   useEffect(() => { console.log("2 ");
    // if(friend){
    // console.log("friend");
    Talk.ready.then(() => markTalkLoaded(true));
      if (talkLoaded && friend) {
     

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

        const otherUser = new Talk.User({
          id: friend.user._id,
          name: friend.user.name,
          email: friend.user.email,
          photoUrl: friend.user.pic,
          role: 'default',
        });

        const conversationId = Talk.oneOnOneId(currentUser, otherUser);
        const conversation = session.getOrCreateConversation(conversationId);
      
        conversation.setParticipant(currentUser);
        conversation.setParticipant(otherUser);

        const inbox = session.createInbox();
        inbox.select(conversation);
        inbox.mount(document.getElementById('talkjs-container'));

        return () => session.destroy(); 
      
      
      
    }
    
  }, [talkLoaded]);

    return (
      <div className='chat_box' id="talkjs-container">
        {friend? friend.user.name : "nu exista"}
      </div>
      )

} 

export default MessengerApi  