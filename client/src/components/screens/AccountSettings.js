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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { Categories, Mediums, Surfaces, Tags } from '../../data'
const Settings = ()=>{  
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory() 
    const [account, setAccount ] = useState('');     
    const [categories, setCategories] = useState([]);
    const [mediums, setMediums] = useState([]);
    const [surfaces, setSurfaces] = useState([]);
    const [tags, setTags] = useState([]);
   
    const [open, setOpen] = useState(false);
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

//    useEffect(()=>{
//     if(url){
//         requestDetails()
//     }
//     },[url])
   const requestDetails = ()=>{
       
       fetch("/setup_account",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            account, categories, mediums, surfaces, tags
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
       else{
           M.toast({html:"Account settings updated successfully",classes:"#43a047 green darken-1"})
           history.push('/profile')
       }
    }).catch(err=>{
        console.log(err)
    })
     
   }
    return (
    <>
        <div 
        style={{
           margin:"30px auto",
           maxWidth:"90vh",
           padding:"20px",
           textAlign:"center"
        }}
       > 
       <h4>Account Settings</h4>
        {/* <div> */}
            
        {/* <label> */}
            {/* <input type="radio" value="Customer" checked={account === 'Customer'} onChange={(e) => {setAccount(e.target.value)}} />
            Customer
        </label>
        <br />
        <label>
            <input type="radio" value="Artist" checked={account === 'Artist'} onChange={(e) => {setAccount(e.target.value)}} />
            Artist
        </label>
        </div> */}
        <div>
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" style={{margin:"10px",textAlign:"left"}}>Account Type</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue='Customer'
        >
            <FormControlLabel value="Customer" control={<Radio />} label="Customer" onChange={(e) => {setAccount(e.target.value);console.log(account)}} />
            <FormControlLabel value="Artist" control={<Radio />} label="Artist"  onChange={(e) => {setAccount(e.target.value);console.log(account)}} />
        </RadioGroup>
        </FormControl>
        </div>
        <div>
            <InputLabel id="categories" style={{margin:"10px",textAlign:"left"}}>Categories</InputLabel>
            <Select
            labelId="categories"
            id="categories-select"
            value={categories}
            label="Categories"
            multiple
            style={{width: "100%"}}
            // open={open}
            // onClose={handleClose}
            // onOpen={handleOpen}
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
            {/* <div>
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
            </div> */}
               <div>
                <InputLabel id="mediums" style={{margin:"10px",textAlign:"left"}}>Mediums</InputLabel>
                <Select
                labelId="mediums"
                id="mediums-select"
                value={mediums}
                label="Mediums"
                multiple
                style={{width: "100%"}}
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
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
            {/* <div>
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
            </div> */}
                 <div>
                <InputLabel id="surfaces" style={{margin:"10px",textAlign:"left"}}>Surfaces</InputLabel>
                <Select
                labelId="surfaces"
                id="surfaces-select"
                value={surfaces}
                label="Surfaces"
                multiple
                style={{width: "100%"}}
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
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

            <button 
            className="btn waves-effect waves-light #64b5f6 blue darken-1 main_button"  
            onClick={()=>requestDetails()}
            >
                Submit request
            </button>
            </div>

        
    </>
     );
}   
export default Settings;