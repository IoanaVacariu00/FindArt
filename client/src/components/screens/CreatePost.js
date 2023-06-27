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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material'; 
const CreatePost = ()=>{
 
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [tags, setTags] = useState([])
    const [open, setOpen] = useState(false) 
 
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
           <TextField
            fullWidth 
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <br/><br/>
             
            <TextField
            placeholder="Description" 
            fullWidth 
            multiline   
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />  
            <br/><br/>
            <div>
                {/* <InputLabel id="tags-select-label" style={{margin:"10px",textAlign:"left"}}>Tags</InputLabel> */}
            <Autocomplete
                multiple
                id="tags-filled"
                options={Tags.map((option) => option)}
                defaultValue={['']}
            
                value={tags}
                onChange={(event, newValue) => {
                setTags(newValue);
                }}
                renderTags={(value) =>
                value.map((option) => (
                    <Chip
                    variant="outlined"
                    label={option}
                    />
                ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tags"
                
                />
                )}
            /> 
                {/* <Autocomplete
                labelId="tags-select-label"
                id="tags-select"
                value={tags} 
                onChange={(event, newValue) => {
                  setTags(newValue);
                }}
                label="Tags"
                renderInput= {(params) => <TextField {...params} label="Controllable" />}
                style={{width: "100%"}}
                options={Tags}
                // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                // renderValue={(selected) => (
                //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                //         {selected.map((value) => (
                //             <Chip key={value} label={value} />
                //         ))}
                //     </Box>  
                // )}
                > */}
                {/* {Tags.map(option => (
                    <MenuItem value={option} key={option}  >
                        {option}
                    </MenuItem>
                    ))} */}
                {/* </Autocomplete>  */}
            </div>
             <br/>
            <div style={{width:'100%',textAlign:'left'}}>  
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} className='custom-file-input' style={{ float:'left'}}/>
            </div> 
             <br/>
            <Button
            variant='contained'
            onClick={()=>postDetails()}
            >
                Submit post
            </Button>

       </div>
   )
}

export default CreatePost