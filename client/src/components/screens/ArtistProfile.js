import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import { Button, Grid, ImageListItemBar } from '@mui/material' 
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { Item } from '../StyledComponents' 
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from '@mui/material';
const ArtistProfile = () =>{
    const [userProfile,setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    const [showModal, setShowModal] = useState(false);

    // const handleModalShow = () => setShowModal(true);
    // const handleModalClose = () => setShowModal(false);
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
                                <Grid className='Grid'item xs={6} style={{border:'none',padding:'5px'}}>
                                    
                                    <Button variant='outlined' fullWidth
                                    className='outlined'
                                    onclick="location.href='/messenger/'+userProfile.user._id'">
                                        Message
                                    </Button> 
                                    
                                </Grid> 
                        
                            </Grid>
                        </Grid>  
                    </Grid> 
                              
                </Grid> 
                <Grid className='Grid' container  >
                <ImageList sx={{ width:'80vw', height:'80vh', margin:'10px auto',color:'rgba(0, 0, 0, 0.6)' }} cols={3} >
                {userProfile.posts.map((item) => (
                
                    <ImageListItem key={item.photo} style={{padding:' 10px 5px'}}>
                        <img
                        src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title} 
                        // style={{height: '100%', width:'100%', objectFit:'cover'}}
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
        //         </div>
        //    </div>
                          
        {/* <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                    )
                })
            }
        </div> */} 
          {/* <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {userProfile.posts.map((item) => (
          <ImageListItem key={item._id}>
            <img
              src={`${item.photo}?w=248&fit=crop&auto=format`}
              srcSet={`${item.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box> */}

    //    </div>
    //    </div>
    //    : <h4>loading...!</h4> 



export default ArtistProfile