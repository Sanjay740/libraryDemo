import React, { Component } from 'react';
import { login } from '../auth';
import { connect } from 'react-redux';
import { loginDispactAction,adminLoginDispactAction } from '../../action/authAction'
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: false };
        this.baseState = this.state
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleClick(event) {
        event.preventDefault();
        const { email, password } = this.state;

        login(email, password).then((data) => {
            if ((data.emailExist == false) || (data.success == false)) {
                toast.warn(data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState(this.baseState)
            }
            else {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                if(data.data.userType == 'user')
                {
                    localStorage.setItem('userData', JSON.stringify(data.data));
                    this.props.dispatch(loginDispactAction(JSON.stringify(data.data)));
                    this.props.history.push('/');
                }
                else
                {
                    localStorage.setItem('adminData', JSON.stringify(data.data));
                    this.props.dispatch(adminLoginDispactAction(JSON.stringify(data.data)));
                    this.props.history.push('/adminDashboard');
                }
                
                
            }
          
        });
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
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapDispatchToProps)(LoginForm)
