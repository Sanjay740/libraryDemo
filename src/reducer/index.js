import {combineReducers} from 'redux';
import auth from './authReducer';
import books from './adminReducer'


export default  combineReducers({
     auth,
     books
})