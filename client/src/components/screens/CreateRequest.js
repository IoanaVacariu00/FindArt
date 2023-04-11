import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom' 
//  import Select  from 'react-select'   
import Box from "@mui/material/Box";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';

import { Categories, Mediums, Surfaces } from '../../data'

const CreateRequest = ()=>{
    const history = useHistory()
    const [maintitle, setMaintitle] = useState(""); 
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState([]);
    const [medium, setMedium] = useState("");
    const [surface, setSurface] = useState("");
    const [dimension, setDimension] = useState("");
    const [searchtag, setSearchtag] = useState([]);
    const [days, setDays] = useState("");
    const [price, setPrice] = useState("");
    const [url,setUrl] = useState("") 
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        const {target: { value }} = event;
        setCategory(value); //typeof value === "string" ? value.split(",") :
        setOpen(false)  
    };  
    console.log(category);

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
           M.toast({html:"Created request Successfully",classes:"#43a047 green darken-1"})
           history.push('/requests')
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
           <input 
            type="text"
            placeholder="title"
            value={maintitle}
            onChange={(e)=>setMaintitle(e.target.value)}
            />
        
           <input
            type="text"
             placeholder="description"
             value={notes}
             onChange={(e)=>setNotes(e.target.value)}
             />
            {/* <input
             type="text"
             placeholder="category"
             value={category}
            onChange={(e)=>setCategory(e.target.value)}
             /> */}  
             {/* <div style={{"border":"groove"}}   >
            <label htmlFor="category">Categories</label> 
            <select placeholder='select' value={category} onChange={handleChange} name="category" multiple>
                {Categories.map(option => (
                    <option key={option.val} value={option.val}>
                        {option.label}
                    </option>
                ))}
            </select></div> */}
            {/* <label className='form-label'>Categories</label> */}
            {/* <Select
                defaultValue={[Categories[0], Categories[1]]}
                placeholder="Category"
                isMulti
                name="categories"
                options={Categories}
                className="basic-multi-select"
                classNamePrefix="select"  
                onChange={handleChange}
            />  */}
        
            <InputLabel id="category-select-label" style={{margin:"10px",textAlign:"left"}}>Category</InputLabel>
            <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            multiple
            style={{width: "100%"}}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                //selected.join(", ")
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
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

            <InputLabel id="medium-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Medium</InputLabel>
                <Select            
                    style={{width: "100%"}}
                    labelId="medium-simple-select-label"
                    id="medium-simple-select"
                    value={medium}
                    label="Medium"
                    onChange={(e) => {setMedium(e.target.value); console.log(medium);}}
                >
                    {Mediums.map(option => (
                        <MenuItem value={option} key={option}>
                            {option}
                        </MenuItem>
                        ))}
                </Select>
                <InputLabel id="surface-simple-select-label" style={{margin:"10px",textAlign:"left"}}>Surface</InputLabel>
                <Select            
                    style={{width: "100%"}}
                    labelId="surface-simple-select-label"
                    id="surface-simple-select"
                    value={surface}
                    label="Surface"
                    onChange={(e) => {setSurface(e.target.value); console.log(surface);}}
                >
                    {Surfaces.map(option => (
                        <MenuItem value={option} key={option}>
                            {option}
                        </MenuItem>
                        ))}
                </Select>
            <input
             type="text"
             placeholder="dimension"
             value={dimension}
            onChange={(e)=>setDimension(e.target.value)}
             />
            <input
             type="text"
             placeholder="searchtag"
             value={searchtag}
            onChange={(e)=>setSearchtag(e.target.value)}
             />
            <input
             type="text"
             placeholder="days"
             value={days}
            onChange={(e)=>setDays(e.target.value)}
             />
                               
            <input
             type="text"
             placeholder="price"
             value={price}
            onChange={(e)=>setPrice(e.target.value)}
             />
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











































// import React, { useEffect, useState } from 'react'; 
// // import UserHeader from '../components/userHeader.js';
// import { makeStyles } from '@material-ui/core';
// import { Autocomplete } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// import { creategig } from '../../action/productListAction.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { Row, Col, Button, Form, Container,Card, FormControl, FormGroup } from "react-bootstrap";
// import Chip from '@material-ui/core/Chip';
// import TextField from '@mui/material/TextField';
// import { creategigbackend } from '../../action/productListAction.js';

// const Creategig = () =>{  

//     const [maintitle, setMaintitle] = useState(""); 
//     const [notes, setNotes] = useState("");
//     const [category, setCategory] = useState("");
//     const [medium, setMedium] = useState("");
//     const [surface, setSurface] = useState("");
//     const [dimension, setDimension] = useState("");
//     const [searchtag, setTag] = useState([]);
//     const [days, setDays] = useState("");
//     const [price, setPrice] = useState("");

//     // const [uploading, setUploading] = useState(false);

//     const dispatch = useDispatch();
//     const userLogin = useSelector(state => state.userLogin)
//     const {userinfo} = userLogin;

//     const creategigdata = useSelector(state => state.creategigdata) 
//     const {gig} = creategigdata;   
    
//     const userid = userinfo._id;
//     const insertedgig = useSelector(state => state.insertedgig);
//     const {loading, insertgigdata, error} = insertedgig;
//     var aux = {maintitle, notes, category, medium, surface, dimension, searchtag, price, days};
//     aux = gig;
//     //const {maintitle, notes, category, medium, surface, dimension, searchtag, price, days, userid} = gig;
//     let history = useHistory();

//     // useEffect(() => {
//     //     // if(userinfo){
//     //     //     if(userinfo.isCustomer===true){
//     //     //         history.push('/')
//     //     //     }
//     //     // }
//     //    // else{
//     //         history.push('/')
//     //   //  }
//     //     // if(!gig){ //aux
//     //     //     history.push('/user')
//     //     // }
//     // }, [history, gig, userinfo])

//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(creategig( maintitle, notes, category, medium, surface, dimension, searchtag, days, price))
//         dispatch(creategigbackend( maintitle,notes,category,medium,surface,dimension,searchtag,days,price,userid))
//         history.push('/')
//     }

//     makeStyles((theme) =>({
//         root:{
//             '& > * + *':{
//                 marginTop: theme.spacing(9)
//             }
//         }
//     }));
//     console.log(insertgigdata)
//     return(
//         <div className='main'>
//           {/* <UserHeader/> */}
//           <div className='creategigs'>
//           {error && <h5>{error}</h5>}
//             {loading && <h5>loading...</h5>}
//               <Form onSubmit={submitHandler}>
//                   <Container>
//                       <Card style={{width: '45rem'}}>
//                           <Card.Body>
//                               <Row className='bnm'>
//                                 <Col sm="3">Request Title</Col>                     
//                                 <Col className='bnm' sm='9'>
//                                     <Form.Control as="textarea" placeholder='I need...' value={maintitle} 
//                                     onChange={(e) => setMaintitle(e.target.value)}></Form.Control>
//                                 </Col>   
//                                </Row>
//                                <Row className='bnm'>
//                         <Col sm="8">
//                             <h6>Describe what you are looking for:</h6>
//                             <FormControl as="textarea" rows={5} placeholder="I am looking for..." value={notes} 
//                                     onChange={(e) => setNotes(e.target.value)}></FormControl>
//                         </Col>
//                     </Row>
//                                <Row>
//                                    <Col sm="3">Category</Col>
//                                    <Col className='bnm'>
//                                        <FormGroup as={Col}>
//                                         <FormControl as="select" value={category} 
//                                     onChange={(e) => setCategory(e.target.value)}>
//                                     <option>Post-Modernism</option>  
//                                     <option>Contemporary Art</option>
//                                     <option>Modern Art</option>
//                                     <option>Minimalism</option>
//                                     <option>Renaissance</option>
//                                     <option>Cubism</option>
//                                     <option>Urban Art</option>
//                                     <option>Conceptual Art</option>
//                                     <option>Dada</option>
//                                     <option>Realism</option>
//                                     <option>Gotic</option>
//                                     <option>Geometric Abstraction</option>
//                                     <option>Impressionism</option>
//                                     <option>Neoimpressionism</option>
//                                     <option>Bauhaus Style</option>
//                                     <option>Any</option>
//                                         </FormControl>
//                                        </FormGroup>
//                                    </Col>

//                                </Row>
//                                <Row>
//                                    <Col sm="3">Medium</Col> 
//                                    <Col className='bnm'>
//                                        <FormGroup as={Col}>
//                                         <FormControl as="select" value={medium} 
//                                     onChange={(e) => setMedium(e.target.value)}>
//                                     <option>Acrylic Paint</option>
//                                     <option>Oil Paint</option>
//                                     <option>Watercolor</option>
//                                     <option>Guache Paint</option>
//                                     <option>Colored Pencils</option>
//                                     <option>Tempera Paint</option>
//                                     <option>Markers</option>
//                                     <option>Charcoal</option>
//                                     <option>Pencil</option>
//                                     <option>Watercolor Pencils</option>
//                                     <option>Oil Pastels</option>
//                                     <option>Mixed Media</option>
//                                     <option>Any</option>
//                                         </FormControl>
//                                        </FormGroup>
//                                    </Col>
//                                </Row>
//                                <Row>
//                     <Col sm="3">Surface</Col>
//                     <Col className='bnm'>
//                             <FormGroup as={Col}>
//                                 <FormControl as="select" value={surface} 
//                                     onChange={(e) => setSurface(e.target.value)}>
//                                     <option>Paper</option>
//                                     <option>Canvas</option>
//                                     <option>Hardwood Panel</option>
//                                     <option>Hardboard Panel</option>
//                                     <option>Medium-Density Fiberboard (MDF)</option>
//                                     <option>Watercolor Paper</option>
//                                     <option>Any</option>
//                                 </FormControl>
//                             </FormGroup>
//                     </Col>
//                     </Row>
//                     <Row>
//                     <Col sm="3">Size</Col>
//                     <Col className='bnm'>
//                             <FormGroup as={Col}>
//                                 <FormControl as="select" value={dimension} 
//                                     onChange={(e) => setDimension(e.target.value)}>
//                                    <option>Small</option>
//                                    <option>Medium</option>
//                                    <option>Large</option>
//                                    <option>Extra Large</option>
//                                    {/* <option>Exact size (i'll mention it in notes)</option> */}
//                                 </FormControl>
//                             </FormGroup>
//                     </Col>
//                     </Row>
                    
//                                <Row> 
//                                     <Col sm="3">Search tags</Col>
//                                    <Col className='bnm'>
//                                         <Autocomplete 
//                                        onChange={(event, value) => setTag(value)}
//                                        multiple 
//                                        id="tags-filled" 
//                                        options={top10.map((option) => option.title )}
//                                        freeSolo 
//                                        renderTags={(value, getTagProps)=>
//                                        value.map((option, index)=>(
//                                           <Chip variant="outlined" label={option}{...getTagProps({index})}/>  
//                                        ))
//                                        }      
//                                         renderInput={(params)=>(
//                                             <TextField{...params} 
//                                             variant="filled" 
//                                             label=""
//                                             placeholder="Favourites"/>
//                                             ) }
//                                         /> 
        
//                                   </Col>
//                                </Row>
//                                {/* <Row>
//                                <Form.File id="image-file"  
//                                      label="Choose image"  
//                                      custom
//                                      onChange={uploadFileHandler}
//                                      /> 
//                                </Row> */}
//                                <Row className='bnm'>
//                                 <Col sm="12">What's your budget for this artwork?</Col>                     
//                                 <Col className='bnm' sm='9'>
//                                     <Form.Control as="textarea" placeholder='' value={price} 
//                                     onChange={(e) => setPrice(e.target.value)}></Form.Control>$
//                                 </Col>   
//                                </Row>
//                                <Row className='bnm'>
//                         <Col sm="12">
//                             <h6>What's the ideal delivery time for you?</h6>
//                             <FormControl as="textarea" rows={5} placeholder="ex. 10 " value={days} 
//                                     onChange={(e) => setDays(e.target.value)}></FormControl>days
//                         </Col>
//                     </Row> 
//                     <Row>
//                           <Col sm="7">
//                               <Button  type="cancel"  variant="success">Cancel</Button>
//                           </Col>
//                           <Col sm="4">
//                               <Button type="submit" variant="success">Post</Button>
//                           </Col>
//                       </Row>
//                           </Card.Body>
//                       </Card>
                      
//                   </Container>
//               </Form>
//           </div>
//         </div>
//     )
// } 

// const top10 = [
//     {title:'Acrylic Paint'},
//     {title:'Oil Paint'},
//     {title:'Colored Pencils'},
//     {title:'Watercolor'},
// ];

// export default Creategig

//                                {/* <Row>
//                                    <Col sm="3">Gig Metadata</Col>
//                                    <Col sm="9" className='bnm'>
//                                        <div className='tworowborder'>
//                                             <Row>
//                                                 <Col className='onerowborder' sm="3">Mediums</Col>
//                                                 <Col sm="9">Select the medium: </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col className='onerowborder' sm="3"></Col>
//                                                 <Col className='radio-button'>
//                                                     <Row>
//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Acrylic Paint"  defaultChecked="true"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Acrylic Paint</label>
//                                                         </Col>

//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Oil Paint"  
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Oil Paint</label>
//                                                         </Col>
//                                                     </Row>
//                                                     <br/>

//                                                     <Row>
//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Watercolor"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Watercolor</label>
//                                                         </Col>

//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Colored Pencils"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Colored Pencils</label>
//                                                         </Col>
//                                                     </Row>
//                                                     <br/>

//                                                     <Row>
//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Charcoal"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Charcoal</label>
//                                                         </Col>

//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Oil Pastels"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Oil Pastels</label>
//                                                         </Col>
//                                                     </Row>
//                                                     <br/>

//                                                     <Row>
//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Watercolor Pencils"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Mixed Media</label>
//                                                         </Col>

//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Guache Paint"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Guache Paint</label>
//                                                         </Col>
//                                                     </Row>
//                                                     <br/>

//                                                     <Row>
//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Markers" 
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Markers</label>
//                                                         </Col>

//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Watercolor Pencils"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Watercolor Pencils</label>
//                                                         </Col>
//                                                     </Row>
//                                                     <br/>

//                                                     <Row>
//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Pencil"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Pencil</label>
//                                                         </Col>

//                                                         <Col>
//                                                         <input type="radio" id="other"
//                                                         name="radio" value="Any Mediums"
//                                                         onChange={(e) => setMetadata(e.target.value)}/>
//                                                         <label htmlFor="radio1">Any Mediums</label>
//                                                         </Col>
//                                                     </Row>
//                                                     <br/>
//                                                 </Col>
//                                             </Row>
//                                        </div>
//                                    </Col>
//                                </Row> */}