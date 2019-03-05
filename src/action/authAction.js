import { LOGIN, LOGOUT, WRONG_CREDENTIAL } from './types';
import axios from 'axios';


const ENDPOINT = "http://localhost:4000/";

export const doLogin = (data) => dispatch => {
    axios.post(ENDPOINT + 'login', {
        data
    }).then(res => {
        let response = res.data;
        if ((response.emailExist == false) || (response.success == false)) {
            dispatch(emailNotExist(response));
        }
        else {
            localStorage.setItem('userData', JSON.stringify(response.data));
            dispatch(userLoginAction(response));
        }
    })
        .catch(err => {
            console.log(err)
        });
}

const emailNotExist = data => ({
    type: WRONG_CREDENTIAL,
    payload: data

});

const userLoginAction = data => ({
    type: LOGIN,
    payload: data

});

export const loginDispactAction = (response) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: { data: JSON.parse(response) }
    })
}

// signup process

export const doSignup = (data) => dispatch => {
    axios.post(ENDPOINT + 'signup', {
        data
    }).then(res => {
        let response = res.data;
        console.log(response)
        if (!!response.emailExist) {
            dispatch(emailNotExist(response));
        }
        else {
            localStorage.setItem('userData', JSON.stringify(response.data));
            dispatch(userLoginAction(response));
        }
    })
        .catch(err => {
            console.log(err)
        });
}

export const logoutDispatchAction = (response) => dispatch => {
    localStorage.removeItem('userData')
    dispatch({
        type: LOGOUT
    })
}
