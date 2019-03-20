import { LOGIN, LOGOUT } from './types';
import axios from 'axios';


export const userLoginAction = data => ({
    type: LOGIN,
    payload: data

});


export const logoutDispatchAction = (response) => dispatch => {
    console.log("logout")
    dispatch({
        type: LOGOUT
    })
}
