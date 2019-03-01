import React, { Component } from 'react'
import './register.css';
import { signup } from '../auth';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Register extends Component {
  constructor(props) {
    super(props)   
    this.state = {
      userName: '',
      email: '',
      password: '',
      passwordrepeat: '',
      address: '',
      contactNo: '',
      userType : 'user'
    } 
    this.baseState = this.state
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    if(this.state.password === this.state.passwordrepeat)
    {     
      signup(this.state).then((data) => {
       if(!!data.dataExist)
       {
        toast.warn("Email is already exist", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.setState(this.baseState)
       }
       else{
        toast.success("Successfully signup", {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push('/')
       }

      }).catch({

      })
    }
    else
    {
      toast.error("Password not match", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    
}

  render() {
    return (
      <div>
        <form className="modal-content" >
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label ><b>User Name</b></label>
            <input type="text" placeholder="Enter User Name" name="userName" value={this.state.userName} onChange={this.handleChange.bind(this)} required />

            <label ><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} required />

            <label ><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" maxLength="5" value={this.state.password} onChange={this.handleChange.bind(this)} required />

            <label ><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" maxLength="5" name="passwordrepeat" value={this.state.passwordrepeat} onChange={this.handleChange.bind(this)} required />
           
            <label ><b>Address</b></label>
            <input type="text" placeholder="Enter Address" name="address"  value={this.state.address} onChange={this.handleChange.bind(this)} required />

            <label ><b>Contact No</b></label>
            <input type="text" placeholder="Enter Contact No" name="contactNo" value={this.state.contactNo} onChange={this.handleChange.bind(this)} required />

            {/* <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p> */}

            <div className="clearfix">
              {/* <button type="button" className="cancelbtn">Cancel</button> */}
              <button type="submit" className="signupbtn" onClick={this.handleClick.bind(this)}>Sign Up</button>
            </div>
          </div>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
      
    )
  }
}
