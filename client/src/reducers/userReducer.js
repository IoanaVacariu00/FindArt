export const initialState = null

export const reducer = (state,action)=>{
    if(action.type=="USER"){
        return action.payload
    }
    if(action.type=="CLEAR"){ //logout        
        return null
    }
    if(action.type=="UPDATE"){
        return {
            ...state,
            followers:action.payload.followers,
            following:action.payload.following
        }
    }
    if(action.type=="UPDATEPIC"){
        return {
            ...state,
            pic:action.payload
        }
    }            
    if(action.type=="UPDATEINFO"){
        return {
            ...state,
            accounType:action.payload.accountType,  
            categories:action.payload.categories, 
            mediums:action.payload.mediums,
            surfaces:action.payload.surfaces,
            tags:action.payload.tags
        }
    }         
    return state
} 