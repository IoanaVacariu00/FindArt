import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Settings  = ()=>{  
    const {state,dispatch} = useContext(UserContext);
    return (
    <> 
        <div className="categories">My categories: </div>
    </>
     );
}   
export default Settings;