import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'  
import {Link} from 'react-router-dom'  
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import { Divider, List, ListItem, ListItemText, Table, TableRow, TableCell,TableBody, TableContainer, Paper, Button, Chip, AppBar } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize'; import { styled } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'; 
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete'; 
const Myrequests = ()=>{ 
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
   
    useEffect(()=>{
        fetch("/requestsbyme",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
             setData(result.requests)
        })
  
     },[])
     console.log(data);
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
    const blue = {
        100: "#DAECFF",
        200: "#b6daff",
        400: "#3399FF",
        500: "#007FFF",
        600: "#0072E5",
        900: "#003A75"
      };
    
      const grey = {
        50: "#f6f8fa",
        100: "#eaeef2",
        200: "#d0d7de",
        300: "#afb8c1",
        400: "#8c959f",
        500: "#6e7781",
        600: "#57606a",
        700: "#424a53",
        800: "#32383f",
        900: "#24292f"
      };
    
      const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[500] : blue[200]
          };
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
      );
      const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 10,
        right: -10,  
        margin: '10px',
      });
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
                                        <div >
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
                <div>No requests yet!</div>
            }      
            <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 }} style={{background:"transparent"}}>
                    <Toolbar >
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