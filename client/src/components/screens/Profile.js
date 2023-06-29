
import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import AddIcon from '@mui/icons-material/Add';  
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'; 
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom'  
import {  Table, TableRow, TableCell,TableBody, TableContainer, Paper, Chip, AppBar } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete'; 
import Typography from "@mui/material/Typography";
import { Item } from '../StyledComponents' 
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button, Grid, ImageListItemBar } from '@mui/material' 
const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const [requests, setRequests] = useState([])
    const {state,dispatch} = useContext(UserContext); 
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
       }).then(res=>res.json())
       .then(result=>{         
           setPics(result.mypost)  
     
       })
    },[])    
    useEffect(()=>{
        fetch('/requestsbyme',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
             }
        }).then(res=>res.json())
        .then(result=>{         
            setRequests(result.requests)               
        })
     },[]) 
    
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","findart")
        data.append("cloud_name","nocompany1234567")
        fetch("https://api.cloudinary.com/v1_1/nocompany1234567/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               window.location.reload()
           })
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    const deleteRequest = (requestid)=>{
        fetch(`/deleterequest/${requestid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = requests.filter(item=>{
                return item._id !== result._id
            })
            setRequests(newData)
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
   return ( 
    <div style={{height:'100vh'}}>
     {state && <Box sx={{ flexGrow: 1 }} style={{margin:'30px'}}>
  
        <Grid className='Grid' container spacing={1} style={{width:'80vw',margin:'auto',}}>
                    <Grid className='Grid' item xs={2}  style={{border: 'none',borderRadius:'5px',padding:'5px'}}> 
                        <Grid className='Grid' item xs={12} style={{padding:'10px'}}>
                            <Item>
                                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={state.pic}/>
                            </Item>
                        </Grid>
                        <Grid className='Grid'item xs={12} >
                            <Item>
                                <Typography variant="h6" style={{border:'none',fontWeight:'600'}}>{state.name}</Typography>                       
                                <Typography variant="h7" style={{border:'none',}}>{state.accountType}</Typography>                       
                            </Item>
                        </Grid> 
                        <Grid className='Grid' item xs={12} style={{border:'none'}}>  
                            <Grid className='Grid' container spacing={1} style={{padding:'30px' ,}}>
                                <Item>
                                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}  
                                    className='custom-file-input' 
                                    style={{border:'none',}}/>
                                </Item>
                        
                            </Grid>
                        </Grid>  
                    </Grid> 
                    {(state.accountType=='Artist' && state.bio!='') &&
                  <Grid className='' item xs={10}  style={{border: '',borderRadius:'5px',padding:'30px',margin:'auto'}}>
                  <Item><Typography variant="h6"  style={{textAlign:'right'}}><i>"{state.bio}"</i></Typography></Item>     
                  </Grid> 
                        }        
                        {(state.accountType=='Customer' && state.customerbio!='') &&
                        <Grid className='' item xs={10}  style={{border: '',borderRadius:'5px',padding:'30px',margin:'auto'}}>
                        <Item><Typography variant="h6"  style={{textAlign:'right'}}><i>"{state.customerbio}"</i></Typography></Item>     
                        </Grid> 
                        }
        </Grid> 

                    {
                    state?.accountType == 'Artist' &&

                    <Grid className='Grid' container  >
                        <ImageList sx={{ width:'80vw', height:'80vh', margin:'10px auto',color:'rgba(0, 0, 0, 0.6)' }} cols={3} >
                        {mypics.map((item) => (
                    
                        <ImageListItem key={item.photo} style={{padding:' 10px 5px'}}>
                            <img
                            src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title} 
                            // style={{height: '100%', width:'100%', objectFit:'cover'}}
                            loading="lazy"
                            />
                            <ImageListItemBar
                            title={<strong>{item.title}</strong>}
                            subtitle={<span style={{textAlign:'center'}}> {item.body}</span>}
                            position="below"
                            /> 
                        </ImageListItem>
                    
                        ))}
                        </ImageList> 
                    </Grid>
                    }
                
                {
                    state?.accountType == 'Customer' &&
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
                                            <div >
                                                <DeleteIcon style={{float:'right',cursor:"pointer",padding:'5px'}} onClick={()=>deleteRequest(item._id)}/> 
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
                                                {item.assigned==false  &&  
                                                <Button variant="contained" style={{margin:"20px auto",padding:"10px" , position:'relative'}}>
                                                    <Link to={"/accepted/"+item._id} >See potential sellers</Link>
                                                </Button>
                                                }
                                                {
                                                    (item.assigned==true  &&  item.assignedTo) &&
                                                    <Item>Assigned to {item.assignedTo} </Item>
                                                } 

                                            </TableContainer>

                                        </div> 
                                </div>
                                
                            )
                        })
                    }   
                    </div>  
                }
       
                <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, boxShadow:'none' }} style={{background:"transparent"}}>
                    <Toolbar >
                        <Link to={state?.accountType=='Artist'? "/create" : '/createrequest'} >
                            <StyledFab color="primary" aria-label="add"> 
                                <AddIcon />  
                            </StyledFab>  
                        </Link>
                    </Toolbar>
                </AppBar> 
   
      </Box>}
     </div> 
      )
}
  
export default Profile