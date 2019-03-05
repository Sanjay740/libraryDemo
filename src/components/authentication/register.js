import React, { Component } from 'react'
import './register.css';
import { doSignup } from '../../action/authAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { loginDispactAction } from '../../action/authAction';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      email: '',
      password: '',
      passwordrepeat: '',
      address: '',
      contactNo: '',
      userType: 'user'
    }
    this.baseState = this.state
  }

  componentWillReceiveProps(nextProps) {
   if(nextProps.auth.data != null)
    {    
    if ((nextProps.auth.isEmailExist == true) && (nextProps.auth.success == false)) {
      toast.warn(nextProps.auth.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState(this.baseState)
    }
    else {
      if (nextProps.auth.data.userType == 'user') {
        this.props.history.push('/');
      }
      else {
        this.props.history.push('/adminDashboard');
      }
    }
  }
  }

  componentDidMount() {
    const data = localStorage.getItem('userData');
        if (data != null) {
            this.props.dispatch(loginDispactAction(data));
        } 
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.password === this.state.passwordrepeat) {
      this.props.dispatch(doSignup(this.state))      
    }
    else {
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
            <input type="text" placeholder="Enter Address" name="address" value={this.state.address} onChange={this.handleChange.bind(this)} required />

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
const mapStateToProps = (state) => ({
  auth: state.auth.loginCredential
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)
