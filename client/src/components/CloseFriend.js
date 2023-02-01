const CloseFriend = ({user}) => {
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src="https://assets.stickpng.com/thumbs/589eec6964b351149f22a88a.png" alt="" /> 
        {/* {PF+user.profilePicture}  */}
        <span className="sidebarFriendName">{user.name}</span>
      </li>
    );
  }

  export default CloseFriend