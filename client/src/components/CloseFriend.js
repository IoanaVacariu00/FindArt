const CloseFriend = ({user}) => {
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.pic} alt="" /> 
        {/* {PF+user.profilePicture}  */}
        <span className="sidebarFriendName">{user.name}</span>
      </li>
    );
  }

  export default CloseFriend