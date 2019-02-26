import { LOGIN ,LOGOUT} from './types';

export const loginDispactAction = (response) => dispatch => {   
    dispatch({
        type : LOGIN,
        payload :response
    })   

}

export const logoutDispatchAction =() => dispatch => {
    localStorage.removeItem('userData');
    console.log(localStorage.getItem('userData'))
    // dispatch({
    //     type : LOGOUT
    // })
}
