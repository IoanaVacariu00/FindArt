import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'  
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'    
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Button } from '@mui/material';
import Typography from "@mui/material/Typography";
const Accepted = ()=>{ 

    const {state} = useContext(UserContext)
    const [artists, setArtists] = useState([])   
    const {requestid} = useParams();
    const [request, setRequest] = useState('')  
    useEffect(()=>{
        fetch(`/potential_sellers/${requestid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            
        }).then(res=>res.json())
        .then(result=>{
            setArtists(result.artists)
        })
     },[])
     useEffect(()=>{
        fetch(`/request/${requestid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            
        }).then(res=>res.json())
        .then(result=>{
            setRequest(result)
        })
     },[])
    console.log(request);
    const assignrequest = (artistid)=>{
        fetch(`/assignRequest/${requestid}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                'Authorization':"Bearer "+localStorage.getItem("jwt")
            }            ,
            body:JSON.stringify({
                artistid: artistid
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = artists.map(item=>{
                if(item._id==result._id){
                    return result
                }  
                else{
                    return item
                }
            })
            setArtists(newData)    
            console.log(result);
          }).catch(err=>{
              console.log(err)
          })
    }    
    console.log(artists);
   return (
    <>
    {artists? 
        <div className="home" >
        <div className="card input-field" 
        style={{  
            margin:"30px auto",
            maxWidth:"60%",
            padding:"20px",
            textAlign:"center"
            }}
        >
        <List>
            {artists.map(artist=>{
            return(
                
                <ListItem disablePadding  key={'artist2'+artist._id}>
                    <Link to={"/artist_profile/"+artist._id } key={'artist'+artist._id} style={{width:"100%"}}> 
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar alt={artist?.name} src={artist?.pic} style={{width:"60px",height:"60px"}}/>
                            </ListItemIcon>
                            <Typography variant='h6' style={{margin:"0 20px"}}>{artist?.name}</Typography> 
                        </ListItemButton>
                    </Link>
                     {
                         (request?.assigned == true && request?.assignedTo == artist._id) && 
                         <Button variant="contained" style={{margin:"10px",padding:"10px" ,background:'red',color:'white'}}
                         disabled>
                         Chosen
                     </Button>
                      }
                      { 
                         request?.assigned == false && 
                    <Button variant="contained" style={{margin:"10px",padding:"10px" }}
                        onClick = {()=>{assignrequest(artist._id);window.location.reload()}}>
                        Choose Artist
                    </Button>
                       } 
         
                </ListItem>
                )
            })}
        </List>
    </div>
    </div>
    : 
   
    <div style={{height:'70vh',width:'95vw',border:'none'}}>
        
        <Typography variant="h6" className='noContent' style={{margin:'10px auto',color: '#4E606A;',opacity:'60%'}}>No applicants yet!</Typography>
    </div>

    }
     {
        artists=='' &&
        <div style={{height:'70vh',width:'95vw',border:'none'}}>
        
        <Typography variant="h6" className='noContent' style={{margin:'10px auto',color: '#4E606A;',opacity:'60%'}}>No applicants yet! </Typography>
    </div>
     }
    </>
    )
 
} 
export default Accepted