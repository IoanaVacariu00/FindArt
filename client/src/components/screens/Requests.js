import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'    
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

    // const likePost = (id)=>{
    //       fetch('/like',{
    //           method:"put",
    //           headers:{
    //               "Content-Type":"application/json",
    //               "Authorization":"Bearer "+localStorage.getItem("jwt")
    //           },
    //           body:JSON.stringify({
    //               requestId:id
    //           })
    //       }).then(res=>res.json())
    //       .then(result=>{
    //                //   console.log(result)
    //         const newData = data.map(item=>{
    //             if(item._id==result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //       }).catch(err=>{
    //           console.log(err)
    //       })
    // }
  

    // const makeComment = (text,postId)=>{
    //       fetch('/comment',{
    //           method:"put",
    //           headers:{
    //               "Content-Type":"application/json",
    //               "Authorization":"Bearer "+localStorage.getItem("jwt")
    //           },
    //           body:JSON.stringify({
    //               postId,
    //               text
    //           })
    //       }).then(res=>res.json())
    //       .then(result=>{
    //           console.log(result)
    //           const newData = data.map(item=>{
    //             if(item._id==result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //          })
    //         setData(newData)
    //       }).catch(err=>{
    //           console.log(err)
    //       })
    // }

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
        .then(result=>{ console.log(result)
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

   return (
    <>
    {data? 
       <div className="home">
           {data.map(item=>{
            
            return(
                    <div className="card home-card" key={item._id} style={{padding:"20px"}}>
                        <h5 style={{padding:"5px"}}>
                            <Link to={item.user._id !== state._id?"/profile/"+item.user._id :"/profile"  }>
                                {item.user.name}
                            </Link>
                        </h5> 
                        {item.user._id != state._id &&   
                    
                            <Fab color="primary" size="small" aria-label="add" style={{float:"right"}} 
                            >  
                            {item.acceptedBy.includes(state.id) ?
                            <CheckCircleIcon onClick={()=>{declineRequest(item._id) }}/>
                            :
                            <AddIcon onClick={()=>{acceptRequest(item._id) }}/>
                            }    
                            </Fab> 
                        }
                        <h6>{item.maintitle}</h6>
                        <p>{item.notes}</p>
                        <p>{item.category}</p>
                        <p>{item.medium}</p>
                        <p>{item.surface}</p>
                        <p>{item.dimension}</p>
                        <p>{item.searchtag}</p>
                        <p>{item.price}</p>
                        <p>{item.days}</p>
                    </div> 
                   )    
                
                }
                
                )}
       </div>
        : 
        <h6>No requests yet!</h6>
        }
       
       </>
        
       )
 
    }  


export default Requests
