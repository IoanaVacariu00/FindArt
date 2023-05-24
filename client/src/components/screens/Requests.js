import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'    
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'; 
import UpIcon from '@mui/icons-material/KeyboardArrowUp';   
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider, List, ListItem, ListItemText, Table, TableRow, TableCell, TableContainer, Paper, Button, Chip, TableBody } from '@mui/material';
const Requests = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
   
    useEffect(()=>{
       fetch('/allrequests',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
            setData(result.requests)
       })
    },[])

    const deleteRequest = (requestid)=>{
        fetch(`/deleterequest/${requestid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    const acceptRequest = (id)=>{
        fetch('/acceptrequest',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                requestId:id
            })
        }).then(res=>res.json())
        .then(result=>{ console.log(result)
          const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
    const declineRequest = (id)=>{
          fetch('/declinerequest',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  requestId:id
              })
          }).then(res=>res.json())
          .then(result=>{
        
            const newData = data.map(item=>{
                if(item._id==result._id){
                    console.log('result: '+result)
                    return result
                }else{
                  
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

   return (
    <>
    {data? 
        <div >
           {data.map(item=>{
            
            return(
                    <div className="card input-field" key={item._id}   
                     style={{  
                        margin:"30px auto",
                        maxWidth:"500px",
                        padding:"20px",
                        textAlign:"center"
                     }}>
                        <h5 style={{padding:"5px"}}>
                            <Link to={"/profile/"+item.user._id}>
                            <p style={{float:"left"}}>{item.user.name ? item.user.name : 'not found'} </p>
                            </Link>
                      
                        {item.acceptedBy.includes(state._id)
                            ? 
                             <i className="material-icons"  style={{float:"right"}}
                                    onClick={()=>{declineRequest(item._id)}}
                              >check_circle</i>
                            : 
                            <i className="material-icons"  style={{float:"right"}}
                            onClick={()=>{acceptRequest(item._id)}}
                            >add_circle</i>
                            }   </h5>
                                <TableContainer component={Paper}>
                                            <Table style={{overflowX:"hidden"}} aria-label="simple table">
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
                                                    <TableCell align="left">{item.notes}</TableCell>
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
                                                            <Chip label={tag} style={{margin:"3px"}} key={'chip'+tag}/>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                </TableBody>
                                            </Table>
                                 
                                        </TableContainer>
                    </div> 
                       
                )}
            )} 
            </div>
                : 
                <h6>No requests yet!</h6>
            }      
            
        </>
       
       )
    }  

export default Requests
