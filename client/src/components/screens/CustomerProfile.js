import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams, Link} from 'react-router-dom'
import { Table, TableRow, TableCell,TableBody, TableContainer, Paper, Chip } from '@mui/material';
import {StyledTextarea} from '../StyledComponents'

const CustomerProfile = () =>{
    const [userProfile,setProfile] = useState(null)
    const {state} = useContext(UserContext)
    const {userid} = useParams()
    const [requests, setRequests] = useState([])
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
                   <h6 style={{opacity:'80%'}}>Customer</h6>
                   <h6>{userProfile.user.customerbio}</h6>
                  
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" >
                        <Link to={'/messenger/'+userProfile.user._id} key={userProfile.user._id}>Message</Link>
                    </button>
               
               </div>
           </div>
            
               
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
              
       </div>
       </div>
       : <h4>loading...!</h4>}
       </>
   )
}

export default CustomerProfile