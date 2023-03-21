import axios from "axios"; 
import React, { useEffect, useState , useContext } from "react";
import { UserContext } from "../App";
import {useParams} from 'react-router-dom'
const Conversation = ({conversation, currentUser } )=> {
    const [member, setMember] = useState(null); 
    // const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()    
    const {user, setUser} = useContext(UserContext);
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
  //   useEffect(()=>{
  //     fetch(`/user/${userid}`,{
  //         headers:{
  //             "Authorization":"Bearer " + localStorage.getItem("jwt")
  //         }
  //     }).then(res=>res.json())
  //     .then(result=>{
  //         setMember(result)
  //     })
  //  },[])
    useEffect(()=>{
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      //crapa aici
      fetch(`/user/${friendId}`,{
        headers:{
            "Authorization":"Bearer " + localStorage.getItem("jwt")
        }
    }
          ).then(res=>res.json())
          .then(result=>{
      
          setMember(result)
      })
   },[conversation, currentUser])

    return (
    <>
     {member ?
    <div className="conversation">
      <img
        className="conversationImg"
        src={member.user.pic}
        alt=""
      />
   
      <span className="conversationName">{member.user.name}</span>
    </div> 
    : <h2>loading...!</h2>}
    </>
    );
};

export default Conversation

