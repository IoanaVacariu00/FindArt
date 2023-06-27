import React,{useState,useEffect} from 'react' 
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'    
import { Button, InputLabel, TextField } from '@mui/material'
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
 
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("") 
    const [accountType, setAccountType] = useState("") 
    const [url,setUrl] = useState(undefined) 

    const account_handleChange = (event) => {
        setAccountType(event.target.value); console.log(accountType) ;
    };     
    console.log(accountType);
   
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
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
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                accountType, 
                pic:url
                
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }

   return (
      
        <div className="card auth-card input-field mycard">
            <h1 style={{fontFamily:'monospace'}}>Welcome to FindArt!</h1> 
            <div style={{display:'flex'}}>
                <div id="register_left" style={{border:'none', margin:'5px', padding:'10px'}}>
                    <TextField  style={{margin:'5px'}}
                    fullWidth 
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    /> 
                    <TextField  style={{margin:'5px'}}
                    fullWidth 
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    /> 

                    <TextField  type="password"  style={{margin:'5px'}}
                    fullWidth 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPasword(e.target.value)}
                    />  
                    {/* </div> */}
                    {/* 
                    <span style={{color:"#9e9e9e"}}>Account type:</span>
                    <label style={{margin:"10px"}}>
                        <input className="with-gap" name="accountType" 
                        value="Customer" type="radio" checked={accountType === 'Customer'}
                        onChange={account_handleChange}/>
                        <span>Customer</span>
                    </label>
        
                    <label style={{margin:"10px"}}>
                        <input className="with-gap" name="accountType" 
                        value="Artist" type="radio"
                        onChange={account_handleChange} checked={accountType === 'Artist'}/>
                        <span>Artist</span>
                    </label>
                    */}
                
                    {/* <div id="register_right" style={{border:'none',margin:'0 5px', padding:'10px', textAlign:'left', borderRadius:'5px'}}> */}
                    <br/><br/> 
                    <div style={{display:"flex",margin:'5px'}}>
                        <InputLabel id="demo-simple-select-label" style={{width: "50%",margin:"10px",textAlign:"left"}}>Account Type</InputLabel>
                        <Select
                            style={{width: "100%",textAlign:"left"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={accountType}
                            label="Account Type"
                            onChange={(e)=>setAccountType(e.target.value)}
                        >
                            <MenuItem value="Artist">Artist</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                        </Select>
                    </div>  
                    <div style={{width:'100%',textAlign:'left'}}>  
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} className='custom-file-input' style={{margin:'10px', float:'left'}}/>
                    </div> 
                    {/* <div style={{margin:'5px', float:'left'}}>                    
                        <FormControl >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{padding:'5px'}}>Account Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"     
                            >
                                <FormControlLabel value="Artist" control={<Radio />} label="Artist" onChange={account_handleChange}/>
                                <FormControlLabel value="Customer" control={<Radio />} label="Customer" onChange={account_handleChange}/>
                                </RadioGroup>
                        </FormControl>  
                     </div> */}
                                                        
                </div>
            </div>
            <Button style={{width: '50%'}}
            variant="contained"
            onClick={()=>PostData()}
            >
                Sign Up
            </Button>
            <h3><Link to="/signin">Already have an account?</Link></h3>
        </div> 
    )
}

export default SignIn