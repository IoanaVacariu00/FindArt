import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useHistory} from 'react-router-dom' 
import Box from "@mui/material/Box";
import M from 'materialize-css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';
import { styled } from "@mui/system";
import TextareaAutosize from '@mui/base/TextareaAutosize'; 
import { Categories, Mediums, Surfaces, Tags } from '../../data'
import TextField from '@mui/material/TextField';
const Settings = ()=>{  
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory() 
    const [bio, setBio] = useState('') ;   const [customerbio, setCustomerBio] = useState('') ;   
    const [accountType, setAccountType ] = useState('');     
    const [categories, setCategories] = useState([]);
    const [mediums, setMediums] = useState([]);
    const [surfaces, setSurfaces] = useState([]);
    const [tags, setTags] = useState([]);  

    const [open, setOpen] = useState(false);

    useEffect(()=>{
        if(state){    

            setAccountType(state.accountType?state.accountType : '' ); 
            setBio(state.bio? state.bio : '');
            setCustomerBio(state.customerbio? state.customerbio : '');
            setCategories(state.categories?state.categories : ['any categories']);
            setMediums(state.mediums? state.mediums : ['any mediums']);
            setSurfaces(state.surfaces? state.surfaces : ['any surfaces']);
            setTags(state.tags? state.tags : []);
 
        }

       
     },[])

    const handleChange = (event) => {
        const {target: { value }} = event;
        setTags(value); 
        setOpen(false)  
    };  

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

   const requestDetails = ()=>{

       fetch("/save_changes",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({   
            accountType:accountType,        
            bio:bio, 
            customerbio:customerbio,
            categories:categories,
            mediums: mediums,
            surfaces: surfaces,
            tags: tags
        })
    }).then(res=>res.json()).then(result=>{
        console.log(result)
        localStorage.setItem("user",JSON.stringify(
            {...state, 
            accountType:accountType,     
            bio:bio, 
            customerbio:customerbio,       
            categories:categories,
            mediums: mediums,
            surfaces: surfaces,
            tags: tags   }
            ))
        dispatch({type:"UPDATEINFO",payload:result})
        if(result.error){
          M.toast({html: result.error,classes:"#c62828 red darken-3"})
        }
        else{
           M.toast({html:"Account settings updated successfully",classes:"#43a047 green darken-1"})
           history.push('/profile')
           window.location.reload()
       }
    })
   }
   const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75"
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f"
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
    return (
    <>
        <div 
        style={{
           margin:"20px auto",
           maxWidth:"90vh",
           height:'100vh',
           padding:"20px",
           textAlign:"center",
           background:'white',
            
        }}
       > 
        <div style={{padding: "0 15px", display:'inline-block'}}>
            <h4>Account Settings</h4>
        </div>
        <br/>
        <div style={{display:"flex"}}>
            <InputLabel id="demo-simple-select-label" style={{width: "50%",margin:"10px",textAlign:"left"}}>Account Type</InputLabel>
            <Select
                style={{width: "50%",textAlign:"left"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={accountType}
                label="Age"
                onChange={(e)=>setAccountType(e.target.value)}
            >
                <MenuItem value="Artist">Artist</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>

            </Select>
       
        </div>  
        {accountType==='Artist'  && 
            <div>
            <InputLabel id="bio" style={{margin:"10px",textAlign:"left"}}>Bio</InputLabel>
            <TextField  
            fullWidth 
            multiline    
            maxRows={6}
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            />
            </div> 
        }
        {accountType==='Customer'  && 
            <div>
            <InputLabel id="customerbio" style={{margin:"10px",textAlign:"left"}}>Customer Bio</InputLabel>
            <TextField  
            fullWidth 
            multiline    
            maxRows={6}
            value={customerbio}
            onChange={(e)=>setCustomerBio(e.target.value)}
            />
            </div> 
        }
        <div>
            <InputLabel id="categories" style={{margin:"10px",textAlign:"left"}}>Categories</InputLabel>
            <Select
            labelId="categories"
            id="categories-select"
            value={categories}
            label="Categories"
            multiple
            style={{width: "100%"}}
            onChange={(e) => {setCategories(e.target.value)}}
            input={<OutlinedInput id="select-multiple-chip-categories" label="ChipCateg" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip variant="outlined" key={value} label={value} />
                    ))}
                </Box>  
            )}
            >
                {Categories.map(option => (
                    <MenuItem value={option} key={option}  >
                        {option}
                    </MenuItem>
                    ))}
            </Select> 
            </div>
        <div>
            <InputLabel id="mediums" style={{margin:"10px",textAlign:"left"}}>Mediums</InputLabel>
            <Select
            labelId="mediums"
            id="mediums-select"
            value={mediums}
            label="Mediums"
            multiple
            style={{width: "100%"}}
            onChange={(e) => {setMediums(e.target.value)}}
            input={<OutlinedInput id="select-multiple-chip-mediums" label="Chipmediums" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip variant="outlined" key={value} label={value} />
                    ))}
                </Box>  
            )}
            >
                {Mediums.map(option => (
                    <MenuItem value={option} key={option}  >
                        {option}
                    </MenuItem>
                    ))}
            </Select> 
        </div>
        <div>
                <InputLabel id="surfaces" style={{margin:"10px",textAlign:"left"}}>Surfaces</InputLabel>
                <Select
                labelId="surfaces"
                id="surfaces-select"
                value={surfaces}
                label="Surfaces"
                multiple
                style={{width: "100%"}}
                onChange={(e) => {setSurfaces(e.target.value)}}
                input={<OutlinedInput id="select-multiple-chip-surfaces" label="Chipsurfaces" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip variant="outlined" key={value} label={value} />
                        ))}
                    </Box>  
                )}
                >
                    {Surfaces.map(option => (
                        <MenuItem value={option} key={option}  >
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
                value={tags}
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
            
            <button style={{float:"right", margin:'10px 0'}}
            className="btn waves-effect waves-light #64b5f6 blue darken-1 main_button"  
            onClick={()=>requestDetails()}
            >
                Save
            </button>
            
            </div>
    </>
     );
}   
export default Settings;