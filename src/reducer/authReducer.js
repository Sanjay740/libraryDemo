import {LOGIN, LOGOUT,WRONG_CREDENTIAL} from '../action/types';

const initialState = {    
    loginCredential : {},
    isUserAuthenticate : false
}

export default function(state = initialState ,action)
{  
    switch(action.type)
    {
       
        case LOGIN:       
        return {
            ...state,
            loginCredential : {
                isEmailExist :true,
                success: true,
                isUserAuthenticate : true,
                data: action.payload.data,
                userType: action.payload.data.userType
            }
        }

        //Email  and password wrong
        case WRONG_CREDENTIAL:
        return {
            ...state,
            loginCredential : { 
                isEmailExist :action.payload.emailExist,
                message: action.payload.message,
                success: action.payload.success
            }
        } 

        case LOGOUT:   
        return {
            ...state,
            loginCredential : {}
        }
        default :        
        return state
    }
}