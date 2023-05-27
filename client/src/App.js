import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'   
import "./App.css"
import { StyledEngineProvider } from '@mui/material/styles';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Requests from './components/screens/Requests';
import CreateRequest from './components/screens/CreateRequest';
import Messenger from './components/screens/Messenger';
import MessengerApi from './components/screens/MessengerApi';   
import Settings from './components/screens/AccountSettings';   
import Myrequests from './components/screens/Myrequests'; 
import Accepted from './components/screens/Accepted';
import { AppBar } from '@mui/material';
import Container from "@mui/material/Container";
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
        history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route path="/requests">
        <Requests />
      </Route> 
      <Route path="/my_requests">
        <Myrequests/>
      </Route>
      <Route path="/createrequest">
        <CreateRequest />
      </Route>
      <Route exact path="/messenger">
        <Messenger/>
      </Route>        
      <Route path="/messenger/:userid">
        <MessengerApi/>
      </Route>  
      <Route path="/settings">
        <Settings/>
      </Route>  
      <Route path="/accepted/:requestid">
        <Accepted />        
      </Route>
     </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <AppBar position="fixed"  sx={{ top:0 , bottom:'auto'}} style={{background:'black'}}>
          <Container maxWidth="xl">
            <NavBar /> 
          </Container> 
        </AppBar>  
      <Routing />
        
      </BrowserRouter>
    </UserContext.Provider> 
  );
}

export default App;
