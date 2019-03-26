import adminReducer from './reducer/adminReducer'
import authReducer from './reducer/authReducer'

describe('TEST LOGOUT REDUCER',()=>{
    it('TEST LOGOUT REDUCER', () => {
        let state = authReducer({},{type:"LOGOUT",result:  {            
        }});
        expect(state).toEqual({ loginCredential: { isEmailExist: false,
            success: false,
            isUserAuthenticate: false,
            data: {},
            userType: ''} })
    });
});

describe('TEST LOGIN REDUCER',()=>{
    it('TEST LOGIN REDUCER', () => {
        let state = authReducer({},{type:"LOGIN",payload:  { 
            email:'sanjaysingh.wdm@gmail.com',
            'custom:usertype': 'user'
        }        
    });
    console.log("state",state)
        
        expect(state).toEqual({ loginCredential: { isEmailExist: true,
            success: true,
            isUserAuthenticate: true,
            data: {email:'sanjaysingh.wdm@gmail.com', "custom:usertype":'user'},
            userType:'user'
        } })
    });
});

describe('TEST FETCH ALL BOOK REDUCER',()=>{
    it('TEST FETCH ALL BOOK REDUCER', () => {
        let state = adminReducer({},{type:"FETCH_ALL_BOOK",payload:[{"bookId":"123","bookName":"Sanjay"}]}); 
    console.log("state",state)
        
        expect(state).toEqual({ booksData: [{
            bookId: '123',
            bookName : "Sanjay"
        }] })
    });
});