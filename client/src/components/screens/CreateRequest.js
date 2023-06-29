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
import { Button, Typography } from '@mui/material'; 
import { Categories, Mediums, Surfaces, Tags } from '../../data'
import Autocomplete from '@mui/material/Autocomplete'; 
 
const CreateRequest = ()=>{
    const history = useHistory()
    const [maintitle, setMaintitle] = useState(""); 
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState(Categories[0]);
    const [medium, setMedium] = useState(Mediums[0]);
    const [surface, setSurface] = useState(Surfaces[0]);
    const [dimension, setDimension] = useState('');
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
           history.push('/main_requests')
       }
    }).catch(err=>{
        console.log(err)
    })

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
       <h1>Create a Request!</h1>
       <InputLabel id="title-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Title</InputLabel>
        <TextField
        fullWidth
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

        <br/>
        <Autocomplete
        value={category}
        onChange={(event, newValue) => {
          setCategory(newValue);
        }}
        id="controllable-states-demo-categ"  
        style={{padding:" 0"}}
        options={Categories}
        renderInput={(params) => <TextField {...params} label="Category" />}
        />
        <br/>
        <Autocomplete
        value={medium}
        onChange={(event, newValue) => {
          setMedium(newValue);
        }}
        id="controllable-states-demo-medium"  
        style={{padding:" 0"}}
        options={Mediums}
        renderInput={(params) => <TextField {...params} label="Medium" />}
        />
      
        <br/>
        <Autocomplete
        value={surface}
        onChange={(event, newValue) => {
          setSurface(newValue);
        }}
        id="controllable-states-demo-medium"  
        style={{padding:" 0"}}
        options={Surfaces}
        renderInput={(params) => <TextField {...params} label="Surface" />}
        />

      
         <br/>
        <Autocomplete
        multiple
        id="tags-filled"
        options={Tags.map((option) => option)}
        defaultValue={['']}
      
        value={searchtag}
        onChange={(event, newValue) => {
          setSearchtag(newValue);
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
       <br/>
       

        <div className="file-field input-field">
       
        </div>
        <Button 
        variant='contained'
        onClick={()=>requestDetails()}
        >
            Submit request
        </Button>
        </div>
   )
}

export default CreateRequest
