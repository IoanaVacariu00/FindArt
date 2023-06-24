import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'    
import {Table, TableRow, TableCell, TableContainer, Paper, Chip, TableBody } from '@mui/material';  
import {blue, grey, StyledFab, StyledTextarea} from '../StyledComponents'
import AddIcon from '@mui/icons-material/Add';
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from '@mui/material';
const PendingRequests = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
   
    useEffect(()=>{  
        if(state){

            if(state.accountType === 'Artist')
            {
                fetch("/allrequests",{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                    }).then(res=>res.json())
                    .then(result=>{
                        setData(result.requests)
                    })
            }
            else if(state.accountType === 'Customer') {
                fetch("/unassigned",{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                    }).then(res=>res.json())
                    .then(result=>{
                        setData(result.requests)
                    })
            }
        }
    },[])

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
        .then(result=>{ 
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
    {(data && state)? 
        <div >
           {data.map(item=>
           {
                return(
                <>
                {
                    item.acceptedBy.includes(state._id) &&
                    <div className="card input-field" key={item._id}   
                     style={{  
                        margin:"30px auto",
                        maxWidth:"500px",
                        padding:"20px",
                        textAlign:"center"
                     }}>
                        <h5 style={{padding:"5px"}}>
                            <Link to={"/customer_profile/"+item.user._id}>
                            <p style={{float:"left"}}>{item?.user.name} </p>
                            </Link>
                            {state.accountType === 'Artist' && 
                                <>
                                    {item.acceptedBy.includes(state._id)
                                        ? 
                                        <i className="material-icons"  style={{float:"right"}}
                                                onClick={()=>{declineRequest(item._id)}}
                                        >check_circle</i>
                                        : 
                                        <i className="material-icons"  style={{float:"right"}}
                                        onClick={()=>{acceptRequest(item._id)}}
                                        >add_circle</i>
                                        }    
                                </>
                            }
                        </h5>
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
                                        <TableCell align="left" >  
        
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
                                        <TableCell component="th" scope="row" 
                                            style={{fontWeight: "800", opacity:"75%"}} 
                                        >
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
                }    
                </>
                )}
            
                )} 
                </div>
                : 
                <div className="card input-field"    
                style={{  
                   margin:"30px auto",
                   maxWidth:"500px",
                   padding:"20px"}}
                   >
                    <h6>No requests yet!</h6>
                </div>
            }   
            
             {/* {data=='' &&   
                <div className="card input-field"    
                style={{  
                   margin:"30px auto",
                   maxWidth:"500px",
                   padding:"20px"}}
                   >
                    <h6>No pending requests!</h6>
                </div>
            } */}
            {state.accountType === 'Customer' &&
            
                <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 }} style={{background:"transparent"}}>
                    <Toolbar>
                        <Link to="/createrequest" >
                            <StyledFab color="primary" aria-label="add"> 
                                <AddIcon />  
                            </StyledFab>  
                        </Link>
                    </Toolbar>
                </AppBar>
            }
        </>
       
       )
    }  

export default PendingRequests
