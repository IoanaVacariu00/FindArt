import React,{useContext, useRef, useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Palette from "@mui/icons-material/Palette"  
import SearchIcon from '@mui/icons-material/Search';
import { SearchIconWrapper, Search, StyledInputBase } from './styledComponents';
const NavBar = ()=>{

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    // const searchModal = useRef(null)
    // const [search, setSearch] = useState('')
    // const [userDetails, setUserDetails] = useState([])
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory()

    // useEffect(()=>{
    //   M.Modal.init(searchModal.current)
    // }, [])
    
    // const renderList = ()=>{
    //    if(state){
    //     if(state.accountType == "Customer") {
    //       return [
    //         <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
    //         <li key="2"><Link to="/profile">My Profile</Link></li>,   
    //         <li key="33"><Link to="/my_requests">My Requests</Link></li>, 
    //         <li key="6"><Link to="/myfollowingpost">My Feed</Link></li>,
    //         <li key="7"><Link to="/messenger">Messages</Link></li>,
    //         <li key="8">
    //           <button className="btn #c62828 red darken-3" style={{margin:"10px"}}
    //             onClick={()=>{ 
    //               localStorage.clear()
    //               dispatch({type:"CLEAR"})
    //               history.push('/signin')
    //             }}
    //           >
    //           Logout
    //           </button>
    //         </li>                    
    //        ]
    //     }

    //     if(state.accountType == "Artist") {
    //       return [
    //         <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
    //         <li key="2"><Link to="/profile">My Profile</Link></li>,   
    //         <li key="4"><Link to="/requests">Requests</Link></li>,
    //         <li key="5"><Link to="/create">Create Post</Link></li>, 
    //         <li key="6"><Link to="/myfollowingpost">My Feed</Link></li>,
    //         <li key="7"><Link to="/messenger">Messages</Link></li>,
    //         <li key="8">
    //           <button className="btn #c62828 red darken-3"  
    //           style={{margin:"10px"}}
    //             onClick={()=>{
    //               localStorage.clear()
    //               dispatch({type:"CLEAR"})
    //               history.push('/signin')
    //             }}
    //           >
    //           Logout
    //           </button>
    //         </li>                    
    //        ]
    //     }

    //    }
    //    else {
    //      return [
    //       <li key="9"><Link to="/signin">Signin</Link></li>,
    //       <li key="10"><Link to="/signup">Signup</Link></li>
    //      ]
    //    }
    //  }

    //  const fetchUsers = (query)=>{
    //     setSearch(query)
    //     fetch('/searchusers',{
    //       method:"post",
    //       headers:{
    //         "Content-Type":"application/json"
    //       },
    //       body:JSON.stringify({
    //         query
    //       })
    //     }).then(res=>res.json())
    //     .then(results=>{
    //       setUserDetails(results.user)
    //     })
    //  }

     return(
      //   <AppBar position="fixed"  sx={{ top:0 , bottom:'auto'}} style={{background:"white"}}>
      //     <Toolbar >
      //   <div className="nav-wrapper white">
      //     <Link to={state?"/":"/signin"} className="brand-logo left">FindArt</Link>
      //     <ul id="nav-mobile" className="right">
      //       {renderList()}
      //     </ul>
      //   </div>
        
      //   <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
      //       <div className="modal-content">
      //         <input
      //           type="text"
      //           placeholder="search users"
      //           value={search}
      //           onChange={(e)=>fetchUsers(e.target.value)}
      //         />
      //         <ul className="collection">
      //           {userDetails.map(item=>{
      //             return <Link key={item.name} to={item._id !== state._id ? "/profile/"+item._id:'/profile'} 
      //             onClick={()=>{
      //               M.Modal.getInstance(searchModal.current).close()
      //               setSearch('')
      //             }}><li className="collection-item">{item.name}</li></Link> 
      //           })}
                
      //         </ul>
      //       </div>
      //       <div className="modal-footer">
      //         <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
      //       </div>
      //   </div>
      //   </Toolbar>
      // </AppBar>
      // <AppBar position="fixed"  sx={{ top:0 , bottom:'auto'}} style={{background:'black'}}>
      // <Container maxWidth="xl">disableguters
      <>
       <Toolbar >
          <Palette sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={state?"/myfollowingpost":"/signin"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none"
            }} id="FindArt"
          >
            FindArt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {state && 
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
            <MenuItem key="Discover" onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Link to="/"> Discover</Link></Typography>
            </MenuItem>
            <MenuItem key="Requests" onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Link to='/main_requests'>Requests</Link></Typography>
            </MenuItem>
            <MenuItem key="Inbox" onClick={handleCloseNavMenu}>
              <Typography textAlign="center">  
                <Link to='/messenger'>Inbox</Link>
              </Typography>
            </MenuItem>   
            <MenuItem> 
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            </MenuItem>
            </Menu>}
          </Box>
          <Palette sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={state?"/myfollowingpost":'/signin'}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none"
            }}
            id="FindArt"
          >
            FindArt
          </Typography>
          {state && 
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
         
              <Button 
                key="Discover" onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ><Link to="/">Discover</Link>
                
              </Button>   
              <Button
                key="Requests" onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ><Link to="/main_requests">
                Requests</Link>
              </Button>
              <Button
                key="Inbox" onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ><Link to="/messenger">Inbox</Link>
                
              </Button> 
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> 

          </Box>
          }   
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                { state &&
                  <img style={{width:"50px", height:"50px", borderRadius:'50%'}} alt={state?.name} src={state.pic} />
                }
                
              </IconButton>
            </Tooltip>
             {state && <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >   
              
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >
                    <Link to="/profile">Profile</Link>
                  </Typography>
                </MenuItem>
                <MenuItem key="Settings" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >
                    <Link to="/settings" onClick={handleCloseUserMenu}> Settings</Link>
                  </Typography>
                </MenuItem>
                <MenuItem key='Logout' onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center"  
                    onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin') 
                    }}
                  >
                  Logout
                  </Typography>
                </MenuItem> 

            </Menu>}
          </Box>
        </Toolbar></>
      // </Container>
    // </AppBar>
  );
    
}

export default NavBar