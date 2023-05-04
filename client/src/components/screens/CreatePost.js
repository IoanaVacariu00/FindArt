import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import CreatableSelect from 'react-select/creatable';
import { Tags } from '../../data';
import Box from "@mui/material/Box";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';
const CreatePost = ()=>{
 
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [tags, setTags] = useState([])
    const [open, setOpen] = useState(false) 
    const [tagOptions, setTagOptions] = useState([])
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                tags,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
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

   const handleClose = () => {
    setOpen(false);
   };

   const handleOpen = () => {
    setOpen(true);
   };

   const handleChange = (event) => {
    const {target: { value }} = event;
    setTags(value); 
    setOpen(false)  
   };  
  
   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           <input 
            type="text"
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
            placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div>
            {/* <CreatableSelect isMulti options={tag} />; */}
                <InputLabel id="tags-select-label" style={{margin:"10px",textAlign:"left"}}>Tags</InputLabel>
                <Select
                labelId="tags-select-label"
                id="tags-select"
                value={tags}
                label="Tags"
                multiple
                style={{width: "100%"}}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>  
                )}
                >
                {Tags.map(option => (
                    <MenuItem value={option} key={option}  >
                        {option}
                    </MenuItem>
                    ))}
                </Select> 
            </div>
           <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1 main_button">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper" style={{width: "max-content"}}>
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button 
            className="btn waves-effect waves-light #64b5f6 blue darken-1 main_button"
            onClick={()=>postDetails()}
            >
                Submit post
            </button>

       </div>
   )
}

export default CreatePost