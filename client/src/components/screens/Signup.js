import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("") 
    //const [customer, setCustomer] = useState(false) /// 
    const [url,setUrl] = useState(undefined) //""?
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
                //customer, ///
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
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Welcome to FindArt</h2>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            /> {/* /// */} 
            {/* <div className="auth-card input-field">
            <input
            type="checkbox"
                id="customer-checkbox"
            value={true}
            onChange={(e)=>setCustomer(e.target.value)}
            />  
            <label for="customer-checkbox">Join as Customer</label><br></br> 
            </div>         */} 
            {/* for="customer-checkbox" */}
            {/* <div className="auth-card input-field">  
            <label  class="container ">join as Customer
                <input type="checkbox" 
                // checked="checked"   
                id="customer-checkbox"
                value={false}
                onChange={(e)=>setCustomer(e.target.value)}/>
                <span class="checkmark"></span>
            </label>   </div> */}
            <div className="file-field input-field">
            <div
           
            className="btn #64b5f6 blue darken-1 main_button"
            >
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div> 

            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button 
         
            className="btn waves-effect waves-light #64b5f6 blue darken-1 main_button" 
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
        </div>
      </div>
   )
}

export default SignIn