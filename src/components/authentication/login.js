import React, { Component } from 'react';
import { login } from '../auth';
import { connect } from 'react-redux';
import { doLogin } from '../../action/authAction'
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: false };
        this.baseState = this.state
    }

    componentWillReceiveProps(nextProps) {    
        if(nextProps.auth.data != null)
        {       
        if ((nextProps.auth.isEmailExist == false) || (nextProps.auth.success == false)) {
            toast.warn(nextProps.auth.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            this.setState(this.baseState)
        }
        else {          
            if(nextProps.auth.data.userType == 'user')
            {
                this.props.history.push('/');
            }
            else
            {
                this.props.history.push('/adminDashboard');
            }
        }
    }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleClick(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.dispatch(doLogin(this.state))
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <form className="modal-content">
                <div className="imgcontainer">
                    <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                </div>

                <div className="container">
                    <label ><b>Email</b></label>
                    <input type="text" placeholder="Enter Username" name="email" value={email} onChange={this.handleChange.bind(this)} />

                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange.bind(this)} />

                    <button type="submit" onClick={this.handleClick.bind(this)}>Login</button>

                </div>
                <ToastContainer autoClose={2000} />
            </form>

        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth.loginCredential
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
