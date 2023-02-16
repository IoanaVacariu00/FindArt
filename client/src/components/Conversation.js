import axios from "axios"; 
import React, { useEffect, useState , useContext } from "react";
import { UserContext } from "../App";
import {useParams} from 'react-router-dom'
const Conversation = ({conversation, currentUser } )=> {
    const [member, setMember] = useState(null); 
    const {state, dispatch} = useContext(UserContext)
    // const {userid} = useParams()    
    // const [user, setUser] = useContext(UserContext);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    // useEffect(() => {
    //   const friendId = conversation.members.find((m) => m !== currentUser._id);//console.log(friendId);
    //   const getUser = async () => {
    //     try {
    //       const res = await axios("/user?userId=" + friendId);
    //       setUser(res.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   getUser();
    // }, [currentUser, conversation]); 

    useEffect(()=>{
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      fetch(`/user?id=/${friendId}`,{
          headers:{
              "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          setMember(result)
      })
   },[currentUser, conversation])

    return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={member.pic}
        alt=""
      />
      <span className="conversationName">{member.name}</span>
    </div>
    );
};

export default Conversation

