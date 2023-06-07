import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'    
import { Table, TableRow, TableCell, TableContainer, Paper, Chip, TableBody } from '@mui/material';  
import TextareaAutosize from '@mui/base/TextareaAutosize'; import { styled } from "@mui/system";

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
                            <Link to={"/profile/"+item.user._id}>
                            <p style={{float:"left"}}>{item?.user.name} </p>
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
            
        </>
       
       )
    }  

export default Requests
