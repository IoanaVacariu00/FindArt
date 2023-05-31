import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom' 
import Box from "@mui/material/Box";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';

import TextField from '@mui/material/TextField';
import { Categories, Mediums, Surfaces, Tags } from '../../data'

const CreateRequest = ()=>{
    const history = useHistory()
    const [maintitle, setMaintitle] = useState(""); 
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState("");
    const [medium, setMedium] = useState("");
    const [surface, setSurface] = useState("");
    const [dimension, setDimension] = useState("");
    const [searchtag, setSearchtag] = useState([]);
    const [days, setDays] = useState("");
    const [price, setPrice] = useState("");
    const [url,setUrl] = useState("") 
    const [open, setOpen] = useState(false);
    const handleChange = (event) => {
        const {target: { value }} = event;
        setSearchtag(value); 
        setOpen(false)  
    };  

    function valuetext(value) {
        return `${value}$`;
    }
      
    const minDistance = 10;
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
    
        if (activeThumb === 0) {
          setPrice([Math.min(newValue[0], price[1] - minDistance),price[1]]);
        } else {
          setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

   useEffect(()=>{
    if(url){
        requestDetails()
    }
    },[url])
   const requestDetails = ()=>{
       
       fetch("/createrequest",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            maintitle,
            notes,
            category,
            medium,
            surface,
            dimension,
            searchtag,
            days,
            price
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
       else{
           M.toast({html:"Request created successfully",classes:"#43a047 green darken-1"})
           history.push('/my_requests')
       }
    }).catch(err=>{
        console.log(err)
    })
       //data.append("file",image)
       //data.append("upload_preset","findart")
       //data.append("cloud_name","nocompany1234567")


    //        method:"post",
    //        body:data
    //    })
    //    .then(res=>res.json())
        
    //    .then(data=>{
    //       setUrl(data.url)
    //    })
    //    .catch(err=>{
    //        console.log(err)
    //    })

   }

   return(
       <div className="card input-filed"
        style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
        }}
       > 
       <h4>Create a Request!</h4>
       <InputLabel id="title-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Title</InputLabel>
        <input 
        type="text"
        placeholder=""
        value={maintitle}
        onChange={(e)=>setMaintitle(e.target.value)}
        />
         <div >
        <InputLabel id="desc-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Description</InputLabel>
        <TextField  
        fullWidth 
        multiline    
        maxRows={6}
        placeholder=""
        value={notes}
        onChange={(e)=>setNotes(e.target.value)}
        />
        </div>
            <div>
            <InputLabel id="category-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Category</InputLabel>
            <Select            
                style={{width: "100%"}}
                labelId="category-simple-select-label"
                id="category-simple-select"
                value={category}
                label="Category"
                onChange={(e) => {setCategory(e.target.value)}}
            >
                {Categories.map(option => (
                    <MenuItem value={option} key={option}>
                        {option}
                    </MenuItem>
                    ))}
            </Select>
            </div> 

            <div>
                <InputLabel id="medium-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Medium</InputLabel>
                <Select            
                    style={{width: "100%"}}
                    labelId="medium-simple-select-label"
                    id="medium-simple-select"
                    value={medium}
                    label="Medium"
                    onChange={(e) => {setMedium(e.target.value);}}
                >
                    {Mediums.map(option => (
                        <MenuItem value={option} key={option}>
                            {option}
                        </MenuItem>
                        ))}
                </Select>
            </div>
            <div>
                <InputLabel id="surface-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Surface</InputLabel>
                <Select            
                    style={{width: "100%"}}
                    labelId="surface-simple-select-label"
                    id="surface-simple-select"
                    value={surface}
                    label="Surface"
                    onChange={(e) => {setSurface(e.target.value);}}
                >
                    {Surfaces.map(option => (
                        <MenuItem value={option} key={option}>
                            {option}
                        </MenuItem>
                        ))}
                </Select>
            </div>
  
            <div>
                <InputLabel id="tag-select-label" style={{margin:"10px",textAlign:"left"}}>Tags</InputLabel>
                <Select
                labelId="tag-select-label"
                id="tag-select"
                value={searchtag}
                label="Search Tags"
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

            {/* <InputLabel id="surface-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Price Range</InputLabel>
            <Box style={{ width: "50%", margin:"10px auto" }}>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={price}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </Box> */}

           <div className="file-field input-field">
            {/* <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div> */}
            {/* <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div> */}
            </div>
            <button 
            className="btn waves-effect waves-light #64b5f6 blue darken-1 main_button"  
            onClick={()=>requestDetails()}
            >
                Submit request
            </button>
            </div>
   )
}

export default CreateRequest
