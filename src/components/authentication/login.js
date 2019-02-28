import React, { Component } from 'react';
import { login } from '../auth';
import { connect } from 'react-redux';
import { loginDispactAction } from '../../action/authAction'
import './register.css';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: false };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleClick(event) {
        event.preventDefault();
        const { email, password } = this.state;

        login(email, password).then((data) => {
            let response = data[0];
            if (response != null && !!response.isLogin) {
                console.log(this.props.history)
                localStorage.setItem('userData', JSON.stringify(response));
                this.props.dispatch(loginDispactAction(JSON.stringify(response)));
                this.props.history.push('/');
            }
            else {
                this.setState({ error: true })
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
                    <label ><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="email" value={email} onChange={this.handleChange.bind(this)} />

                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange.bind(this)} />

                    <button type="submit" onClick={this.handleClick.bind(this)}>Login</button>
                </div>

            </form>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapDispatchToProps)(LoginForm)
