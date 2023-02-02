import axios from "axios";
import React, { useEffect, useState } from "react";

const Conversation = ({ conversation, currentUser })=>{
    const [user, setUser] = useState(null);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    useEffect(() => {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      const getUser = async () => {
        try {
          const res = await axios("/users?userId=" + friendId);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentUser, conversation]); 
    
    return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
            user.pic
        }
        alt=""
      />
      <span className="conversationName">{user.name}</span>
    </div>
    );
};

export default Conversation

