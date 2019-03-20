import { ADD_BOOK_DATA_RESPONSE, FETCH_ALL_BOOK, RESET_BOOK_DATA, EDIT_BOOK, FETCH_ALL_USER } from './types';
import axios from 'axios';
import AWS from 'aws-sdk'
import AWSConfig from '../configs/aws';
import gql from 'graphql-tag'
import Client from 'aws-appsync'
import { Auth } from 'aws-amplify'
import GraphqlAPI from '../graph/graphql'

const client = new Client({
     url: AWSConfig.appsync.aws_appsync_graphqlEndpoint,
     region: AWSConfig.appsync.aws_appsync_region,
     auth: {
          type: AWSConfig.appsync.aws_appsync_authenticationType,
          jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken,
          apiKey: AWSConfig.appsync.aws_appsync_apiKey
     },
     disableOffline: true
})

const ENDPOINT = "http://localhost:4000/";

export const addBook = (data, stateData) => dispatch => {
     axios.post(ENDPOINT + 'upload', data, {
          headers: {
               "content-type": "application/json"
          }
     }).then(res => {
          client.mutate({
               mutation: gql(GraphqlAPI.addBook),
               variables: {
                    createbooksinput: {
                         title: stateData.bookName,
                         author: stateData.authorName,
                         year: stateData.year,
                         image: res.data.image,
                         inStock: stateData.inStock,
                         description: stateData.description
                    }
               },
          }).then((data) => {
               dispatch(bookData());
          }).catch((err) => {
               console.log("Error --- ", err);
          })

     });
}

const bookData = () => dispatch => {
     dispatch({
          type: ADD_BOOK_DATA_RESPONSE
     })
}

const fetchAllbooks = (response) => dispatch => {
     dispatch({
          type: FETCH_ALL_BOOK,
          payload: response
     })
}

export const resetbookData = () => dispatch => {
     dispatch({
          type: RESET_BOOK_DATA
     })
}

export const fetchAllBook = () => dispatch => {
     client.query({
          query: gql(GraphqlAPI.listBooks),
          fetchPolicy: 'network-only'
     }).then((data) => {
          console.log("word data --- ", data);
          let arrItems = []
          arrItems = data.data.listBooks.items.map((item) => {
               // console.log(item)
               return item
          })
          dispatch(fetchAllbooks(arrItems));
     }).catch((err) => {

     })

}

export const fetchAllUser = () => dispatch => {
     var params = {
          UserPoolId: AWSConfig.cognito.USER_POOL_ID,
          AttributesToGet: [
               'email', 'custom:usertype', 'sub'
          ],

     };
     AWS.config.update({ region: AWSConfig.cognito.REGION, 'accessKeyId': AWSConfig.cognito.AWS_ACCESS_KEY_ID, 'secretAccessKey': AWSConfig.cognito.AWS_SECRET_KEY });
     var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
     cognitoidentityserviceprovider.listUsers(params, (err, data) => {
          if (err) {
               console.log(err);
          }
          else {
               let userData = []
               data.Users.forEach(async element => {
                    if (element.Attributes[0].Value != 'admin') {
                         let newdata = {
                              username: element.Username,
                              email: element.Attributes[2].Value,
                              id: element.Attributes[1].Value
                         }
                         await userData.push(newdata)
                    }
                    dispatch(fetchAllUsers(userData));
               });
          }
     })

}

const fetchAllUsers = (response) => dispatch => {
     dispatch({
          type: FETCH_ALL_USER,
          payload: response
     })
}



export const editBook = (id) => dispatch => {
     client.query({
          query: gql(GraphqlAPI.getBookById),
          variables: { id },
          fetchPolicy: 'network-only'
     }).then((data) => {
          dispatch(editedBook(data.data.getBooks));
     }).catch((err) => {

     })

}

const editedBook = (response) => dispatch => {
     dispatch({
          type: EDIT_BOOK,
          payload: response
     })
}

export const updateBook = (data) => dispatch => {
     client.mutate({
          mutation: gql(GraphqlAPI.updateBook),
          variables: {
               UpdateBooksInput: {
                    id: data.id,
                    title: data.data.bookName,
                    author: data.data.authorName,
                    year: data.data.year,
                    inStock: data.data.inStock,
                    description: data.data.description
               }
          },
     }).then((data) => {

          dispatch(bookData());

     }).catch((err) => {
          console.log("Error --- ", err);
     })

}

export const assignBookToUser = (data) => dispatch => {
     console.log(data)
     client.mutate({
          mutation: gql(GraphqlAPI.assignedBook),
          variables: {
               createassigninput: {
                    userId : data.userId,
                    currentDate :data.currentDate,
                    dateOfReturn : data.dateOfReturn,
                    bookId :data.bookId,
                    isBookAssigned: true
               }
          },
     }).then((assignedData) => {
          console.log("assigned book data" ,assignedData)
          client.mutate({
               mutation: gql(GraphqlAPI.updateBook),
               variables: {
                    UpdateBooksInput: {
                         id: data.bookId,
                         inStock: data.assignBookStock - 1
                    }
               },
          }).then((result) => {
               console.log("mutation",result)
               dispatch(fetchAllBook());

          }).catch((err) => {
               console.log("Error --- ", err);
          })

     }).catch((err) => {
          console.log("Error --- ", err);
     })
}
