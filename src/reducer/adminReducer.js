import {ADD_BOOK_DATA_RESPONSE,FETCH_ALL_BOOK,RESET_BOOK_DATA,EDIT_BOOK,FETCH_ALL_USER} from '../action/types';

const initialState = {    
   booksData : [],
   userData : [],
   isBookAdded: false,
   message: '',
   editedbookData : {}
}

export default function(state = initialState ,action)
{  
    switch(action.type)
    {
      
        case ADD_BOOK_DATA_RESPONSE:  
        return {
            ...state,
            isBookAdded : true,            
        }
        
        case FETCH_ALL_BOOK :
        return {
            ...state,
            booksData : action.payload
            
        }

        case FETCH_ALL_USER :
        return {
            ...state,
            userData : action.payload
            
        }
        
        case RESET_BOOK_DATA:       
        return {
            ...state,
            isBookAdded : false,
            message: '' ,
        }

        case EDIT_BOOK:   
        console.log("EDIT_BOOK",action.payload)    
        return {
            ...state,
            editedbookData : action.payload          
        }
        default :        
        return state
    }
}