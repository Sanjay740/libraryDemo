import {LOGIN, LOGOUT} from '../action/types';

const initialState = {    
    loginCredential : {}
}

export default function(state = initialState ,action)
{   
    switch(action.type)
    {
        case LOGIN:       
        return {
            ...state,
            loginCredential : action.payload
        }

        case LOGOUT:       
        return {
            ...state,
            loginCredential : {"isLogin" : false}
        }
        
        default :        
        return state
    }
}