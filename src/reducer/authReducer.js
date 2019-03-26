import { LOGIN, LOGOUT, WRONG_CREDENTIAL } from '../action/types';

const initialState = {
    loginCredential: {},
    isUserAuthenticate: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                loginCredential: {
                    isEmailExist: true,
                    success: true,
                    isUserAuthenticate: true,
                    data: action.payload,
                   userType: action.payload['custom:usertype']
                }
            }
            
        case LOGOUT:
            return {
                ...state,
                loginCredential: {
                    isEmailExist: false,
                    success: false,
                    isUserAuthenticate: false,
                    data: {},
                    userType: ''
                }
            }
        default:
            return state
    }
}