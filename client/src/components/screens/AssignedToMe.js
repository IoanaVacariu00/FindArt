import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'; 
import {blue, grey, StyledFab, StyledTextarea} from '../StyledComponents'
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from '@mui/material';
import { Table, TableRow, TableCell, TableContainer, Paper, Chip, TableBody } from '@mui/material';  
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
 import Typography from '@mui/material/Typography';

const AssignedToMe = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)

    useEffect(()=>{  
        if(state){

            if(state.accountType === 'Artist')
            {
                fetch("/assigned_to_me",{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                    }).then(res=>res.json())
                    .then(result=>{
                        setData(result.requests)
                    })
            }
            else if(state.accountType === 'Customer') {
                fetch("/assigned",{
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
   return (
    <>
    {(data && state)? 
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
                            <Link to={"/customer_profile/"+item.user._id}>
                            <p style={{float:"left"}}>{item?.user.name} </p>
                            </Link>                          
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
                                    <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                        Category
                                    </TableCell>
                                    <TableCell align="left">
                                        {state.categories?.includes(item.category) ? 
                                            <Chip label={item.category} style={{background:"blue",color:"white"}}/> 
                                                :
                                            <p>{item.category}</p>
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    key={item.medium}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                        Medium
                                    </TableCell>
                                    <TableCell align="left">  
                                    {state.mediums?.includes(item.medium) ? 
                                            <Chip label={item.medium} style={{background:"blue",color:"white"}}/> 
                                                :
                                            <p>{item.medium}</p>
                                        }
                                        </TableCell>
                                </TableRow>  
                                <TableRow
                                    key={item.surface}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                        Surface
                                    </TableCell>
                                    <TableCell align="left">
                                    {state.surfaces?.includes(item.surface) ? 
                                            <Chip label={item.surface} style={{background:"blue",color:"white"}}/> 
                                                :
                                            <p>{item.surface}</p>
                                        }
                                    </TableCell>
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
                                        <>
                                        {state.tags?.includes(tag) ? 
                                        <Chip label={tag} style={{background:"blue",color:"white", margin:"3px"}} key={'chip'+tag}/> 
                                                :
                                            <Chip label={tag} style={{margin:"3px"}} key={'chip'+tag}/>
                                        }
                                        </>
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
            {data=='' &&
                <div style={{height:'70vh',width:'95vw',border:'none'}}>
                            
                    <Typography variant="h6" className='noContent' style={{margin:'10px auto',color: '#4E606A;',opacity:'60%'}}>No requests!<br/>Once you create a request, it will appear here. </Typography>
                </div>
            } 
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

export default AssignedToMe
