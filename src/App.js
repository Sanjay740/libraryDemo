import React, { Component } from 'react';
import './App.css';
import Routing from './routeConfig';
import { Provider } from 'react-redux';
import store from './store';
// import setAuthToken from './setToken';
// import {loginDispactAction} from './action/authAction';

// const data = JSON.parse(localStorage.getItem('userData'));
// if (data) {
//     setAuthToken(data.token);
// }
class App extends Component {
  render() {
    return (  
       <Provider store={store}>
      <Routing />
      </Provider>
    );
  }
}

export default App;
