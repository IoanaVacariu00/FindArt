import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'  
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'    
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'; 
import UpIcon from '@mui/icons-material/KeyboardArrowUp';   
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Accepted = ()=>{ 
    const {state} = useContext(UserContext)
    const [data,setData] = useState([])         
    const {requestid} = useParams();
    console.log('id of req:'+requestid);
    useEffect(()=>{
        fetch(`/potential_sellers/${requestid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.artists)
        })
  
     },[])
     console.log("potential sellers:" + data);

   return (
    <>
    {data? 
        <div className="home">
            {data.map(artist=>{
                return(
                        <div className="card home-card" style={{padding:"20px"}}>
                            <h5 style={{padding:"5px"}}>
                                <Link to={artist._id !== state._id?"/profile/"+artist._id :"/profile" } key={'artist'+artist._id}>
                                    {artist.name ? artist.name : 'not found'} 
                                </Link>
                            </h5> 
            
                        </div> 
                        
                    )
            })}
        </div>
        : 
        <p>No artists applied yet!</p>
    }
    </>
    )
 
} 
export default Accepted