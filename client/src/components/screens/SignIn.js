import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import { Button, InputLabel, TextField } from '@mui/material'
 
import Typography from '@mui/material/Typography';
const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
       const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password        
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h1 style={{fontFamily:'monospace'}}>Welcome Back to FindArt!</h1> 
            
            <TextField  style={{margin:'5px'}}
            sx={{width:'80%'}} 
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />  
            <br/>
            <TextField  type="password"  style={{margin:'5px'}}
              sx={{width:'80%'}} 
            placeholder="Password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            /> 
            <br/><br/>                      
            <Button style={{width: '50%'}}
            variant="contained"
            onClick={()=>PostData()}
            >
                Login
            </Button>
            <h3>
                <Link to="/signup">Don't have an account?</Link>
            </h3>
            </div>
      </div>
   )
}

export default SignIn