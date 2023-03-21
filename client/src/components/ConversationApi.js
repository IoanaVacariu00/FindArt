
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from 'react-router-dom'
const ConversationApi = ({friend})=> {
    // const [member, setMember] = useState(null); 
    // const {userid} = useParams()    
    // const {user, setUser} = useContext(UserContext);
    // useEffect(()=>{
    //   const friendId = conversation.members.find((m) => m !== currentUser._id);
//       fetch(`/user/${friendId}`,{
//         headers:{
//             "Authorization":"Bearer " + localStorage.getItem("jwt")
//         }
//     }
//           ).then(res=>res.json())
//           .then(result=>{
//           setMember(result)
//       })
//    },[])

    return (
    <>
     {friend ?
    <div className="conversation">
      <img
        className="conversationImg"
        src={friend.pic}
        alt=""
      />
      <span className="conversationName">{friend.name}</span>
    </div> 
    : <h2>loading...!</h2>}
    </>
    );
};

export default ConversationApi

