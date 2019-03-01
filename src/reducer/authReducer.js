import {LOGIN, LOGOUT,ADMIN_LOGIN, ADMIN_LOGOUT} from '../action/types';

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

        case ADMIN_LOGIN:       
        return {
            ...state,
            loginCredential : action.payload
        }

        case LOGOUT:       
        return {
            ...state,
            loginCredential : {"isLogin" : false}
        }

        case ADMIN_LOGOUT:       
        return {
            ...state,
            loginCredential : {"isLogin" : false}
        }
        
        default :        
        return state
    }
}