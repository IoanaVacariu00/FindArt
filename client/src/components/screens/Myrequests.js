import React,{ useState,useEffect,useContext } from 'react'
import { UserContext } from '../../App'  
import { Link } from 'react-router-dom'  
import { Table, TableRow, TableCell,TableBody, TableContainer, Paper, Button, Chip, AppBar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete'; 
import {blue, grey, StyledFab, StyledTextarea,Item} from '../StyledComponents'
const Myrequests = ()=>{ 
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
    const [value, setValue] = useState('All');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(()=>{
        fetch("/requestsbyme",
        {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
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
    return(
        <>  
           
            {data? 
                <div >
                    {data.map(item=>{
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
                                    <div>
                                        <Link to={"/profile" }>  
                                            <h5 style={{float:"left", margin:"15px"}}>{state.name}</h5>
                                        </Link>    
                                        <DeleteIcon style={{float:"right",cursor:"pointer"}} onClick={()=>deleteRequest(item._id)}/> 
                                    </div>
                                    
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
                                        <Button variant="contained" style={{margin:"20px auto",padding:"10px" , position:'relative'}}>
                                            <Link to={"/accepted/"+item._id} >See potential sellers</Link>
                                        </Button>
                                    </TableContainer>
                                </div> 
                            </div>
                        )      
                    })}   

                </div>
                : 
                <div></div>
            }     
            {data=='' &&
                <div style={{height:'70vh',width:'95vw',border:'none'}}>
                            
                    <Typography variant="h6" className='noContent' style={{margin:'10px auto',color: '#4E606A;',opacity:'60%'}}>No requests!<br/>Once you create a request, it will appear here. </Typography>
                </div>
            } 
            
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }} style={{background:"transparent"}}>
                <Toolbar>
                    <Link to="/createrequest" >
                        <StyledFab color="primary" aria-label="add"> 
                            <AddIcon />  
                        </StyledFab>  
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    ) 
} 
export default Myrequests