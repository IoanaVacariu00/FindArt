import React,{useState,useEffect,useContext} from 'react'

import {UserContext} from '../../App'  
import {Link} from 'react-router-dom'   
const Myrequests = ()=>{ 
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
    console.log('myrequests')
    useEffect(()=>{
        fetch("/allrequests",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
             setData(result.requests)
        })
  
     },[])

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
    return(
        <>
            {data? 
                <div className="home">
                    {data.map(item=>{
                        return(
                            <>
                                {item.user._id == state._id &&
                                    <div className="card home-card" key={item._id} style={{padding:"20px"}}>
                                        <h5 style={{padding:"5px"}}><Link to={item.user._id !== state._id?"/profile/"+item.user._id :"/profile"  }>{item.user.name}</Link>
                                        <i className="material-icons" style={{float:"right"}} 
                                            onClick={()=>deleteRequest(item._id)}
                                        >delete</i>
                                        </h5> 
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
                                }
                            </>
                        ) // return secundar
                            
                    })}    {/* //data map item */}
                
                </div>//div classname home
                : 
                <h6>No requests yet!</h6>
        }      {/* data? */}
    
            
        </>
    ) //return principal
} //class Myrequests
export default Myrequests