import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'   
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Chip} from '@mui/material';  
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
    <>
    {(data && state) &&
       <div className="home-card" >
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"15px", textAlign:'center'}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
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
                                <h6>{item.title}</h6>
                                <p>{item.body}</p> 
                               
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                } 
                                 
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                  <div>  
                                    {item.tags!='' &&
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>Tags</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        {item.tags.map(tag=>    
                                                <>
                                               {state.tags?.includes(tag) ? 
                                               <Chip label={tag} style={{background:"blue",color:"white", margin:"3px"}} key={'chip'+tag}/> 
                                                     :
                                                    <Chip label={tag} style={{margin:"3px"}} key={'chip'+tag}/>
                                                }
                                                </>
                                                )}
                                        </AccordionDetails>
                                    </Accordion>
                                    }
                                </div>
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
       </div>
        }
        </>
   )
}

export default Home