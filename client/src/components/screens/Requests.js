import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'    
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
    // const unlikePost = (id)=>{
    //       fetch('/unlike',{
    //           method:"put",
    //           headers:{
    //               "Content-Type":"application/json",
    //               "Authorization":"Bearer "+localStorage.getItem("jwt")
    //           },
    //           body:JSON.stringify({
    //               postId:id
    //           })
    //       }).then(res=>res.json())
    //       .then(result=>{
    //         //   console.log(result)
    //         const newData = data.map(item=>{
    //             if(item._id==result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //       }).catch(err=>{
    //         console.log(err)
    //     })
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

   return (
    <>
    {data? 
       <div className="home">
           {data.map(item=>{
                return(
                       <div className="card home-card" key={item._id} style={{padding:"20px"}}>
                            <h5 style={{padding:"5px"}}><Link to={item.user._id !== state._id?"/profile/"+item.user._id :"/profile"  }>{item.user.name}</Link>
                            
                            {item.user._id != state._id &&
                                                         
                            <Fab color="primary" size="small" aria-label="add" style={{float:"right"}} 
                            onClick={()=>{acceptRequest(item._id); console.log(item.accepedBy)}}
                            >
                                <AddIcon />
                            </Fab> 
                       
                            }
                            
                            </h5> 
                            {/* sx={{ '& > :not(style)': { m: 1 } }} */}


                            {/* <div className="card-image">
                                <img src={item.photo}/>
                            </div> */}
                            {/* <div className="card-content"> */}
                            {/* <i className="material-icons" style={{color:"red"}}>favorite</i> */}
                            {/* {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            } */}
                           
                                {/* <h6>{item.likes.length} likes</h6> */}
                                <h6>{item.maintitle}</h6>
                                <p>{item.notes}</p>
                                <p>{item.category}</p>
                                <p>{item.medium}</p>
                                <p>{item.surface}</p>
                                <p>{item.dimension}</p>
                                <p>{item.searchtag}</p>
                                <p>{item.price}</p>
                                <p>{item.days}</p>
                               
                                {/* {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                } */}
                                {/* <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form> */}
                                
                            {/* </div> */}

                        </div> 
                   )
                        
                }
                            
                )
           
            }
       </div>
        : <h6>No requests yet!</h6>}
       </>
       )
}

export default Requests
