import { LOGIN ,LOGOUT,ADMIN_LOGIN,ADMIN_LOGOUT} from './types';

export const loginDispactAction = (response) => dispatch => {   
    dispatch({
        type : LOGIN,
        payload :response
    }) 
}

export const adminLoginDispactAction = (response) => dispatch => {   
    dispatch({
        type : ADMIN_LOGIN,
        payload :response
    })   

}

export const logoutDispatchAction = ()=> dispatch => {
    localStorage.removeItem('userData');
    dispatch({
        type : LOGOUT
    })
}

export const adminlogoutDispatchAction = ()=> dispatch => {
    localStorage.removeItem('adminData');
    dispatch({
        type : ADMIN_LOGOUT
    })
}
