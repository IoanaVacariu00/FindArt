import React,{useEffect, useState, useContext, } from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import { Button, Grid, ImageListItemBar } from '@mui/material' 
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { Item } from '../StyledComponents' 
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from '@mui/material/Modal'; 
import { Link } from 'react-router-dom/cjs/react-router-dom.min'; 
import {useHistory} from 'react-router-dom'
const ArtistProfile = () =>{
    const [userProfile,setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
    const history = useHistory()

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
    
   return (
        <div style={{height:'100vh'}}>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
       {userProfile &&  
            <Box sx={{ flexGrow: 1 }} style={{margin:'30px'}}>
                <Grid className='Grid' container spacing={1} style={{width:'80vw',margin:'auto'}}>
                    <Grid className='Grid' item xs={2}  style={{border: 'none',borderRadius:'5px',padding:'5px'}}> 
                        <Grid className='Grid' item xs={12}style={{padding:'10px'}}>
                            <Item>
                                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={userProfile.user.pic}/>
                            </Item>
                        </Grid>
                        <Grid className='Grid'item xs={12} >
                            <Item>
                                <Typography variant="h6" style={{border:'none',fontWeight:'600'}}>{userProfile.user.name}</Typography>                       
                                <Typography variant="h7" style={{border:'none',}}>Artist</Typography>                       
                            </Item>
                        </Grid> 
                        <Grid className='Grid' item xs={12}>  
                            <Grid className='Grid' container spacing={1} style={{padding:'10px'}}>
                    
                                <Grid className='Grid' item xs={6}  style={{border:'none',padding:'5px'}}>
                                
                                    {showfollow?
                                        <Button fullWidth
                                        variant='outlined'
                                        onClick={()=>followUser()}
                                        >Follow</Button>
                                        : 
                                        <Button fullWidth
                                        variant='outlined'
                                        onClick={()=>unfollowUser()}
                                        >UnFollow</Button>   
                                    }
                                    
                                </Grid> 
                                <Grid className='Grid' item xs={6} style={{border:'none',padding:'5px'}}>
                                    
                                     <Button variant='outlined' fullWidth
                                    className='outlined'
                                    // onclick={ history.push('/messenger/'+ userProfile.user._id)} 
                                    // {"location.href='/messenger/'"+userProfile.user._id+"'"} 
                                    >
                                        <Link to={'/messenger/'+userProfile.user._id}> 
                                        <span style={{color:'#1976d2'}}>Message </span>
                                        </Link>
                                    </Button>  
                                    {/* <div style={{width:'100%',textAlign:'left'}}>  
                                        <div className='custom-button' ><Link to={'/messenger/'+userProfile.user._id}> </Link></div>
                                    </div>  */}
                                    
                                </Grid> 
                        
                            </Grid>
                        </Grid>  
                    </Grid> 
                              
                </Grid> 
                <Grid className='Grid' container  >
                <ImageList sx={{ width:'80vw', height:'80vh', margin:'10px auto',color:'rgba(0, 0, 0, 0.6)' }} cols={3} >
                {userProfile.posts.map((item) => (
                
                    <ImageListItem key={item.photo} style={{padding:' 10px 5px',cursor:'pointer'}}   
                     onClick={handleOpen} 
                     >
                        <img
                        src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title} 
                        loading="lazy"
                        />
                        <ImageListItemBar 
                        title={<strong>{item.title}</strong>}
                        subtitle={<span style={{textAlign:'center'}}> {item.body}</span>}
                        position="below"
                        /> 
                    </ImageListItem>
                  
                ))}
                </ImageList> 
                </Grid>
            </Box>
             
        }

       </div>
   )
}


export default ArtistProfile