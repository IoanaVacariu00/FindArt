import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'  
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'    
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

const Accepted = ()=>{ 
    const {state} = useContext(UserContext)
    const [artists, setArtists] = useState([])       
    const {requestid} = useParams();
    console.log('id of req:'+requestid);
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
     console.log("potential sellers:" + artists);

   return (
    <>
    {artists? 
        <div className="home">
            
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
                    <ListItem disablePadding>
                    <Link to={"/profile/"+artist._id } key={'artist'+artist._id} style={{width:"100%"}}> 
                        <ListItemButton>
                        <ListItemIcon>
                        <Avatar alt={artist?.name} src={artist?.pic}  style={{width:"60px",height:"60px"}}/>
                         
                        </ListItemIcon>
                            <h6 style={{margin:"0 20px"}}>{artist?.name}  </h6> 
                        </ListItemButton>
                        </Link>
                    </ListItem>

                    )
            })}
        </List>
  
        </div>
        </div>
        : 
        <div className="home">
            
        <div className="card input-field" 
        style={{  
            margin:"30px auto",
            maxWidth:"60%",
            padding:"20px",
            textAlign:"center"
            }}
        >
            <p>No artists applied yet!</p>
        </div></div>
    }
    </>
    )
 
} 
export default Accepted