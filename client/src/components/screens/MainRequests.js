import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import Tabsdemo from './tabsdemo'
const MainRequests  = ()=>{
    const {state} = useContext(UserContext)
    return( 
        <> 
        { state && 
            <Tabsdemo/>
        }
        </>
    )
}

export default MainRequests 