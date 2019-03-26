import React, { Component } from 'react';
import './App.css';
import AppWrapper from './routeConfig';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (  
       <Provider store={store}>
      <AppWrapper />
      </Provider>
    );
  }
}

export default App;
