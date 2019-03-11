import { ADD_BOOK_DATA_RESPONSE,FETCH_ALL_BOOK,RESET_BOOK_DATA,EDIT_BOOK,FETCH_ALL_USER } from './types';
import axios from 'axios';

// Add book in database
const ENDPOINT = "http://localhost:4000/";
export const addBook = (data) => dispatch => { 
     console.log(data.formData)
     axios.post(ENDPOINT + 'upload', data, {
          headers: {
               "content-type": "application/json"
          }
     }).then(res => {
          console.log("res",res)
          if(res.data.success == true)
          {    
               dispatch(bookData(res.data));
          }
          
     });
}

const bookData = (response) => dispatch => {
     dispatch({
         type: ADD_BOOK_DATA_RESPONSE,
         payload :response
     })
 }

 const fetchAllbooks = (response) => dispatch => {
     dispatch({
         type: FETCH_ALL_BOOK,
         payload :response
     })
 }

 export const resetbookData = () => dispatch => {
      console.log("RESET_BOOK_DATA")
     dispatch({
         type: RESET_BOOK_DATA
     })
 }

 export const fetchAllBook = () => dispatch => { 
     axios.post(ENDPOINT + 'fetchAllBook', {
          headers: {
               "content-type": "application/json"
          }
     }).then(res => {
          console.log("res",res)
          if(res.data.success == true)
          {
          dispatch(fetchAllbooks(res.data.data));
          }
          
     });
}

export const fetchAllUser = () => dispatch => { 
     axios.post(ENDPOINT + 'fetchAllUser', {
          headers: {
               "content-type": "application/json"
          }
     }).then(res => {
          console.log("res",res)
          if(res.data.success == true)
          {
          dispatch(fetchAllUsers(res.data.data));
          }
          
     });
}

const fetchAllUsers = (response) => dispatch => {
     dispatch({
         type: FETCH_ALL_USER,
         payload :response
     })
 }



export const editBook = (id) => dispatch => {
     axios.get(ENDPOINT + 'editBook/'+id, {
     }).then(res => {
          if(res.data.success == true)
          {
          dispatch(editedBook(res.data.data));
          }
          
     });
}

const editedBook = (response) => dispatch => {
     dispatch({
         type: EDIT_BOOK,
         payload :response
     })
 }

 export const updateBook = (data) => dispatch => {
     axios.post(ENDPOINT + 'updateBook/',data, {
     }).then(res => {
          if(res.data.success == true)
          {
               dispatch(bookData(res.data));
          }
          
     });
}
