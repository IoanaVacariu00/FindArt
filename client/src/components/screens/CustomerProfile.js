// import React,{useEffect, useState, useContext} from 'react'
// import {UserContext} from '../../App'
// import {useParams, Link} from 'react-router-dom'
// import { Table, TableRow, TableCell,TableBody, TableContainer, Paper, Chip } from '@mui/material';
// import {StyledTextarea} from '../StyledComponents'

// const CustomerProfile = () =>{
//     const [userProfile,setProfile] = useState(null)
//     const {state} = useContext(UserContext)
//     const {userid} = useParams()
//     const [requests, setRequests] = useState([])
//     useEffect(()=>{
//        fetch(`/user/${userid}`,{
//            headers:{
//                "Authorization":"Bearer " + localStorage.getItem("jwt")
//            }
//        }).then(res=>res.json())
//        .then(result=>{
//             setProfile(result) 
              
//        })
//     },[])
//     useEffect(()=>{
//         fetch(`/requestsby/${userid}`,{
//             headers:{
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//              }
//         }).then(res=>res.json())
//         .then(result=>{         
//             setRequests(result.requests)               
//         })
//      },[]) 

//    return (
//        <>
//        {userProfile ?
//         <div className="home-card" >
//        <div style={{maxWidth:"550px",margin:"0px auto"}}>
//            <div style={{
//                display:"flex",
//                justifyContent:"space-around",
//                margin:"18px 0px",
//                borderBottom:"1px solid grey"
//            }}>
//                <div>
//                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
//                     src={userProfile.user.pic}
//                    />
//                </div>
               
//                <div>
//                    <h4>{userProfile.user.name}</h4>
//                    <h6 style={{opacity:'80%'}}>Customer</h6>
//                    <h6>{userProfile.user.customerbio}</h6>
                  
//                     <button className="btn waves-effect waves-light #64b5f6 blue darken-1" >
//                         <Link to={'/messenger/'+userProfile.user._id} key={userProfile.user._id}>Message</Link>
//                     </button>
               
//                </div>
//            </div>
            
               
//                 <div> 
//                 {requests.map(item=>{
//                         return(
//                             <div key={item._id}>
                                
//                                 <div className="card input-field" 
//                                     style={{  
//                                         margin:"30px auto",
//                                         maxWidth:"500px",
//                                         padding:"20px",
//                                         textAlign:"center"
//                                     }}
//                                 >
//                                     <TableContainer component={Paper}>
//                                         <Table style={{overflow:"hidden"}} aria-label="simple table">
//                                         <TableBody>
//                                             <TableRow
//                                                 key={item.maintitle}
//                                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                             >
//                                                 <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
//                                                     Title
//                                                 </TableCell>
//                                                 <TableCell align="left">{item.maintitle}</TableCell>
//                                             </TableRow>

//                                             <TableRow 
//                                                 key={item.notes}
//                                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                             >
//                                                 <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
//                                                     Description
//                                                 </TableCell>
//                                                 <TableCell align="left">
//                                                 <StyledTextarea      
//                                                 value={item.notes}
//                                                 readOnly       
                                                    
//                                                 />
//                                                 </TableCell>
//                                             </TableRow>

//                                             <TableRow
//                                                 key={item.category}
//                                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                             >
//                                                 <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
//                                                     Category
//                                                 </TableCell>
//                                                 <TableCell align="left">{item.category}</TableCell>
//                                             </TableRow>
//                                             <TableRow
//                                                 key={item.medium}
//                                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                             >
//                                                 <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
//                                                     Medium
//                                                 </TableCell>
//                                                 <TableCell align="left">{item.medium}</TableCell>
//                                             </TableRow>  
//                                             <TableRow
//                                                 key={item.surface}
//                                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                             >
//                                                 <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
//                                                     Surface
//                                                 </TableCell>
//                                                 <TableCell align="left">{item.surface}</TableCell>
//                                             </TableRow>
//                                             <TableRow
//                                                 key={item.searchtag}
//                                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                             >
//                                                 <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
//                                                     Tags
//                                                 </TableCell>
//                                                 <TableCell align="left">
//                                                     {item.searchtag.map(tag=>  
//                                                         <Chip label={tag} style={{margin:"3px"}}/>
//                                                     )}
//                                                 </TableCell>
//                                             </TableRow>
                                            
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 </div> 
//                             </div>
//                         )
//                     })
//                 }   
//                 </div>  
              
//        </div>
//        </div>
//        : <h4>loading...!</h4>}
//        </>
//    )
// }

// export default CustomerProfile



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
import {useParams} from 'react-router-dom'
const CustomerProfile = ()=>{
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
//       const acceptRequest = (id)=>{
//         fetch('/acceptrequest',{
//             method:"put",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 requestId:id
//             })
//         }).then(res=>res.json())
//         .then(result=>{ 
//           const newData = data.map(item=>{
//               if(item._id===result._id){ 
//                 return result
//               }else{
//                 return item
//               }
//           })
//           setData(newData)
//         }).catch(err=>{
//             console.log(err)
//         })
//   }
//     const declineRequest = (id)=>{
//           fetch('/declinerequest',{
//               method:"put",
//               headers:{
//                   "Content-Type":"application/json",
//                   "Authorization":"Bearer "+localStorage.getItem("jwt")
//               },
//               body:JSON.stringify({
//                   requestId:id
//               })
//           }).then(res=>res.json())
//           .then(result=>{
        
//             const newData = data.map(item=>{
//                 if(item._id==result._id){
                   
//                     return result
//                 }else{
                  
//                     return item
//                 }
//             })
//             setData(newData)
//           }).catch(err=>{
//             console.log(err)
//         })
//     } 
    
   return ( 
    <div style={{height:'100vh'}}>
     {userProfile && <Box sx={{ flexGrow: 1 }} style={{margin:'30px'}}>
  
        <Grid className='Grid' container spacing={1} style={{width:'80vw',margin:'auto',}}>
                    <Grid className='Grid' item xs={2}  style={{border: 'none',borderRadius:'5px',padding:'5px'}}> 
                        <Grid className='Grid' item xs={12} style={{padding:'10px'}}>
                            <Item>
                                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={userProfile.user.pic}/>
                            </Item>
                        </Grid>
                        <Grid className='Grid'item xs={12} >
                            <Item>
                                <Typography variant="h6" style={{border:'none',fontWeight:'600'}}>{userProfile.user.name}</Typography>                       
                                <Typography variant="h7" style={{border:'none',}}>{userProfile.user.accountType}</Typography>                       
                            </Item>
                        </Grid> 
                        <Grid className='Grid' item xs={6} style={{border:'none',padding:'5px'}}>
                                    
                                    <Button variant='outlined' fullWidth
                                   className='outlined'
                      
                                   >
                                       <Link to={'/messenger/'+userProfile.user._id}> 
                                       <span style={{color:'#1976d2'}}>Message </span>
                                       </Link>
                                   </Button>  
                                                             
                               </Grid> 
                    </Grid> 
                
                        {(userProfile.user.accountType=='Customer' && userProfile.user.customerbio!='') &&
                        <Grid className='' item xs={10}  style={{border: '',borderRadius:'5px',padding:'30px',margin:'auto'}}>
                        <Item><Typography variant="h6"  style={{textAlign:'right'}}><i>"{userProfile.user.customerbio}"</i></Typography></Item>     
                        </Grid> 
                        }
        </Grid> 

              
                {
                    userProfile?.user.accountType == 'Customer' &&
                    <div> 
                    {requests.map(item=>{
                            return( <>  {item.assigned == false && 
                                <div key={item._id}>
                                   
                                        <div className="card input-field" 
                                                style={{  
                                                    margin:"30px auto",
                                                    maxWidth:"500px",
                                                    padding:"20px",
                                                    textAlign:"center"
                                                }}
                                        >
                            {/* {item.acceptedBy.includes(state._id)
                            ? 
                             <i className="material-icons"  style={{float:"right"}}
                                    onClick={()=>{declineRequest(item._id)}}
                              >check_circle</i>
                            : 
                            <i className="material-icons"  style={{float:"right"}}
                            onClick={()=>{acceptRequest(item._id)}}
                            >add_circle</i>
                            }     */}
                    
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
                                }</>
                            )
                        })
                    }   
                    </div>  
                }
       

   
      </Box>}
     </div> 
      )
}
  
export default CustomerProfile