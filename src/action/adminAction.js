import { ADD_BOOK } from './types';
import axios from 'axios';


const ENDPOINT = "http://localhost:4000/";
export const addBook = (image) => {
    axios.post(ENDPOINT + 'upload', image
    ).then(res => {
         let response = res.data;
    //     if ((response.emailExist == false) || (response.success == false)) {
    //         dispatch(emailNotExist(response));
    //     }
    //     else {
    //         localStorage.setItem('userData', JSON.stringify(response.data));
    //         dispatch(userLoginAction(response));
    //     }
    // })
    //     .catch(err => {
    //         console.log(err)
         });
}