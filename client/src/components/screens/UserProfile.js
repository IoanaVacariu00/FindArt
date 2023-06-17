import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams,Link} from 'react-router-dom'
import Fab from '@mui/material/Fab'; 
import { Table, TableRow, TableCell,TableBody, TableContainer, Paper, Chip } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
import { styled } from "@mui/system";

const Profile = () =>{
    const [userProfile,setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const [bio, setBio] = useState('');
    const {userid} = useParams()
    const [requests, setRequests] = useState([])
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer " + localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
            setProfile(result) 
             
       })
    },[])
    useEffect(()=>{
        fetch(`/requestsby/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
             }
        }).then(res=>res.json())
        .then(result=>{         
            setRequests(result.requests)               
        })
     },[]) 
    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
        })
    }
    const blue = {
        100: "#DAECFF",
        200: "#b6daff",
        400: "#3399FF",
        500: "#007FFF",
        600: "#0072E5",
        900: "#003A75"
      };
    
      const grey = {
        50: "#f6f8fa",
        100: "#eaeef2",
        200: "#d0d7de",
        300: "#afb8c1",
        400: "#8c959f",
        500: "#6e7781",
        600: "#57606a",
        700: "#424a53",
        800: "#32383f",
        900: "#24292f"
      };
    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[500] : blue[200]
          };
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
      );
    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 10,
        right: -10,  
        margin: '10px',
      });
   return (
       <>
       {userProfile ?
        <div className="home-card" >
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={userProfile.user.pic}
                   />
               </div>
               
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h6  style={{opacity:'80%'}}>{userProfile.user.accountType}</h6>
                   <h6>contact: {userProfile.user.email}</h6>
                   
                   { userProfile.user.accountType == "Artist"  &&
                    <>
                        <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} followers</h6>
                                <h6>{userProfile.user.following.length} following</h6>    
                                
                        </div> 
                    
                        {showfollow?
                            <button style={{margin:"10px"}} 
                            className="btn waves-effect waves-light #64b5f6 blue darken-1"
                            onClick={()=>followUser()}
                            >Follow</button>
                            : 
                            <button style={{margin:"10px"}} 
                            className="btn waves-effect waves-light #64b5f6 blue darken-1"
                            onClick={()=>unfollowUser()}
                            >UnFollow</button>   
                        }
                    </>
                    }
                    { userProfile.user.accountType == "Customer"  && <br /> }
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" >
                        <Link to={'/messenger/'+userProfile.user._id} key={userProfile.user._id}>Message</Link>
                    </button>
               
               </div>
           </div>
           {userProfile.user.accountType == "Artist"  &&
                  
                <div className="gallery">
                    {
                        userProfile.posts.map(item=>{
                            return(
                                <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                            )
                        })
                    }
                </div>
            }
            
            {
                (userProfile.user.accountType == 'Customer' && state?.accountType == "Artist") &&
                <div> 
                {requests.map(item=>{
                        return(
                            <div key={item._id}>
                                
                                <div className="card input-field" 
                                    style={{  
                                        margin:"30px auto",
                                        maxWidth:"500px",
                                        padding:"20px",
                                        textAlign:"center"
                                    }}
                                >
                                    <TableContainer component={Paper}>
                                        <Table style={{overflow:"hidden"}} aria-label="simple table">
                                        <TableBody>
                                            <TableRow
                                                key={item.maintitle}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Title
                                                </TableCell>
                                                <TableCell align="left">{item.maintitle}</TableCell>
                                            </TableRow>

                                            <TableRow 
                                                key={item.notes}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Description
                                                </TableCell>
                                                <TableCell align="left">
                                                <StyledTextarea      
                                                value={item.notes}
                                                readOnly     
                                                  
                                                />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow
                                                key={item.category}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Category
                                                </TableCell>
                                                <TableCell align="left">{item.category}</TableCell>
                                            </TableRow>
                                            <TableRow
                                                key={item.medium}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Medium
                                                </TableCell>
                                                <TableCell align="left">{item.medium}</TableCell>
                                            </TableRow>  
                                            <TableRow
                                                key={item.surface}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Surface
                                                </TableCell>
                                                <TableCell align="left">{item.surface}</TableCell>
                                            </TableRow>
                                            <TableRow
                                                key={item.searchtag}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Tags
                                                </TableCell>
                                                <TableCell align="left">
                                                    {item.searchtag.map(tag=>  
                                                        <Chip label={tag} style={{margin:"3px"}}/>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div> 
                            </div>
                        )
                    })
                }   
                </div>  
              }
       </div>
       </div>
       : <h4>loading...!</h4>}
       </>
   )
}

export default Profile