import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ToastComponent extends Component {
  render() {
    return (
      <div>
         <ToastContainer autoClose={2000} />
      </div>
    )
  }
}
