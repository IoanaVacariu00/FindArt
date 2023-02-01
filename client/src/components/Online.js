import React from "react"; 
const Online = ({state}) => {
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    return (
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg" src="" alt="" />
          {/* {PF+user.profilePicture} */}
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{state.name}</span>
      </li>
    );
  }

export default Online;