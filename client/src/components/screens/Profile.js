
import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'; 
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom'  
import {  Table, TableRow, TableCell,TableBody, TableContainer, Paper, Button, Chip, AppBar } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete'; 

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
    <div className="home-card" style={{marginTop:'75px'}}>
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{margin:"18px 0px",  borderBottom:"1px solid grey"}}>
               <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div><img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={state?.pic}/></div>
                    <div>
                        <h4>{state?state.name:"loading"}</h4>
                        <h6  style={{opacity:'80%'}}>{state?.accountType}</h6>
                        <h6>contact: {state?state.email:"loading"}</h6>  
                        {
                            state?.accountType ==  'Artist'  &&
                            <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                            <h6>{mypics.length} posts</h6>
                            <h6>{state?state.followers.length:"0"}
                                 followers
                             </h6>
                            <h6>{state?state.following.length:"0"} 
                                 following
                            </h6>
                            </div>
                        }
                    </div>
                </div>
                <div className="file-field input-field" style={{margin:"10px"}}>
                    <div className="btn #64b5f6 blue darken-1 main_button">
                        <span>Update pic</span>
                        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper" style={{width: "max-content"}}>
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>      
               
            {
                state?.accountType == 'Artist' &&
                <div className="gallery"> 
                {mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                        )
                    })
                }   
                </div>  
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
                                            {/* <Link to={"/profile" }>  
                                                <h5 style={{float:"left", margin:"15px"}}>{state.name}</h5>
                                            </Link>     */}
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
                            // <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                        )
                    })
                }   
                </div>  
              }
       
            <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 }} style={{background:"transparent"}}>
            <Toolbar >
                <Link to={state?.accountType=='Artist'? "/create" : '/createrequest'} >
                    <StyledFab color="primary" aria-label="add"> 
                        <AddIcon />  
                    </StyledFab>  
                </Link>
            </Toolbar>
        </AppBar> 
       
       </div>
      </div>
   )
}
  
export default Profile