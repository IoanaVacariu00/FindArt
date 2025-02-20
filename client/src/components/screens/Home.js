import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'   
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Table, TableRow, TableCell,TableBody, TableContainer, Paper, Button, Chip, AppBar, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
//   padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Home = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext);
    useEffect(()=>{
        fetch('/allposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
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
    
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
        const newData = data.map(item=>{
            if(item._id==result._id){
                return result
            } else{
                return item
            }
        })
        setData(newData)
        }).catch(err=>{
        console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
            if(item._id==result._id){
                return result
            } else{
                return item
            }
            })
        setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
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
   return (
    <div style={{margin:'40px',border:'none', }} >
    {(data && state) &&
       
    <Box style={{margin:"auto"}}>
    <Grid container spacing={2} 
  
    >
           {data.map(item=>{
                return( 
                    <Grid item xs={3} style={{padding:'5px'}}>
                        <Item >
                            <div key={item._id}> 

                            {item.postedBy && 
                                <h4 style={{padding:"15px", textAlign:'center'}}><Link to={item.postedBy._id !== state._id?"/artist_profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                                && <i className="material-icons" style={{
                                    float:"right"
                                }} 
                                onClick={()=>deletePost(item._id)}
                                >delete</i>

                                }</h4>
                             }
                            <div style={{ height: 'fit-content', }}>
                                <img src={item.photo} style={{height: '330px', width:'330px', objectFit:'cover'}}/>
                            </div>
                            <div className="card-content">
                                                         
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
 
                                  <div>  
                                    {item &&
                                    <Accordion >
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Typography style={{fontWeight: "800", opacity:"75%"}}>See more</Typography>
                                        </AccordionSummary>
                                            <AccordionDetails>  
                                            <div style={{display:"flex"}}>
                                
                                            {item.likes.includes(state._id)
                                                ? 
                                                <i className="material-icons"
                                                onClick={()=>{unlikePost(item._id)}}
                                                >thumb_down</i>
                                                : 
                                                <i className="material-icons"
                                                onClick={()=>{likePost(item._id)}}
                                                >thumb_up</i>
                                            }
                                <div style={{padding:"5px"}}>
                                    <strong>{item.likes.length}</strong>
                                </div>
                                </div>
                            <TextField fullWidth placeholder="Add a comment" /> 
                            <TableContainer component={Paper}> 
                                <Table aria-label="home_page_table"> 
                                    <TableBody> 
                                        { item.title  &&
                                            <TableRow
                                            key={item.title}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            > 
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Title
                                                </TableCell>
                                                <TableCell align="left">{item.title}</TableCell>
                                            </TableRow>
                                        }

                                        { item.body  &&
                                            <TableRow
                                            key={item.body}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            > 
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    About
                                                </TableCell>
                                                <TableCell align="left">{item.body}</TableCell>
                                            </TableRow>
                                        } 
                                        { item.comments  &&
                                            <TableRow
                                            key={item.title +'comments'}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            > 
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Comments
                                                </TableCell>
                                                <TableCell align="left">
                                                {
                                                    item.comments.map(record=>{
                                                    return(
                                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                                    )
                                                    })
                                                } 
                                                </TableCell>
                                            </TableRow>
                                        }

                                        { item.tags  &&
                                            <TableRow
                                            key={item.title+'Tags'}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            > 
                                                <TableCell component="th" scope="row" style={{fontWeight: "800", opacity:"75%"}}>
                                                    Tags
                                                </TableCell>
                                                <TableCell align="left"> 
                                                {item.tags.map(tag=>    
                                                <>
                                                {state.tags?.includes(tag) ? 
                                                    <Chip label={tag} style={{background:"blue",color:"white", margin:"2px"}} key={'chip'+tag}/> 
                                                        :
                                                    <Chip label={tag} style={{margin:"2px"}} key={'chip'+tag}/>
                                                }
                                                </>
                                                )} 
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                        </Table>
                                        </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                    }
                                </div>
                                </form>
                                
                            </div>
                            </div>  
                       </Item>
                    </Grid>
                   )
               })
           }
        </Grid> 
        </Box>
      
        }
           
        </div>
   )
}

export default Home