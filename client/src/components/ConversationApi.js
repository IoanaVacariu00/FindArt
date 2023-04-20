const ConversationApi = ({friend})=> { 
   
  
  
  return (
    <>
      {friend ?
        <div className="conversation" >
          <img
            className="conversationImg"
            src={friend.pic}
            alt=""
          />
          <span className="conversationName">{friend.name}</span>
        </div> 
      : <h3>loading...!</h3>}
    </>
    );
};

export default ConversationApi

