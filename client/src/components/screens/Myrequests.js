import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'  
import {Link} from 'react-router-dom'  
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import { Divider, List, ListItem, ListItemText, Table, TableRow, TableCell,TableBody, TableContainer, Paper, Button, Chip } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize'; import { styled } from "@mui/system";

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
                                        <h5 style={{padding:"5px"}}><Link to={"/profile" }>  
                                        <p style={{float:"left"}}>{state.name}</p>
                                        </Link>
                                        <i className="material-icons" style={{float:"right"}} 
                                            onClick={()=>deleteRequest(item._id)}
                                        >delete</i>
                                        </h5>   
                                        
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
                                            <Button variant="contained" style={{margin:"10px auto",  position:'relative'}}>
                                                <Link to={"/accepted/"+item._id} requestid={item._id}>See potential sellers</Link>
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
            
        </>
    ) 
} 
export default Myrequests