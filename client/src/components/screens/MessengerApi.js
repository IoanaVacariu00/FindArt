import React,{ useEffect, useState, useContext } from 'react';      
import Talk from 'talkjs';   
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
const MessengerApi = () => {   
    const [friend,setFriend] = useState(null);
    const {state} = useContext(UserContext); 
    const {userid} = useParams();   
    const [talkLoaded, markTalkLoaded] = useState(false);

    function getFriend () {
      return fetch (`/finduser/${userid}`,
      {
        headers:{
          "Authorization":"Bearer " + localStorage.getItem("jwt")
        }
      }
      ).then(res=>res.json())
    }

    function loadTalkjs () {
     Talk.ready.then(() => markTalkLoaded(true));
     return markTalkLoaded;
    }
    
    function getBoth () {
      return Promise.all([getFriend(), loadTalkjs()])
    }
    // useEffect(() => {
      
    //   const getUser = async () => {
    //     try {
    //       const res = await axios(`/finduser/${userid}`,
    //       {
    //         headers:{
    //           "Authorization":"Bearer " + localStorage.getItem("jwt")
    //         }
    //       }
    //       )
    //       setFriend(res.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   getUser();
    // }, []); 
    // console.log(friend);

    // useEffect(()=>{
      // fetch(`/finduser/${userid}`,
      // {
      //   headers:{
      //     "Authorization":"Bearer " + localStorage.getItem("jwt")
      //   }
      // }
      // ).then(res=>res.json())
    //   .then(result=>{
    //     setFriend(result); 
    //   })
      
    // },[])

  //  useEffect(() => { 

    // Talk.ready.then(() => markTalkLoaded(true));
      // if (talkLoaded) {
        
      useEffect(() => {
       getBoth ().then(([friend, talkLoaded]) => {

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
        inbox.select(conversation);
        
        inbox.mount(document.getElementById('talkjs-container'));

        return () => session.destroy(); 
      
    })
  },[]);
 
  // }, [talkLoaded]);

    return (  
      <div className='chat_box' id="talkjs-container">
        Loading...
        {/* {friend? friend.user.name : "Loading..."} */}
      </div>
     )

} 

export default MessengerApi  