import React, { Component } from 'react';
import { login } from './auth';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: false};
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleClick(event) {
    event.preventDefault();
    const {email, password} = this.state;

    login(email, password).then((ok) => {
        console.log(ok)
    
    });
  }

  render() {
    const {email, password, error} = this.state;
    return (
      <form className="loginForm">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="text" name="email" value={email}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <p className="help is-danger">{error && 'Invalid credentials'}</p>
          <div className="control">
            <button className="button is-link" disabled={!this.state.email && !this.state.password} onClick={this.handleClick.bind(this)}>Login</button>
          </div>
        </div>
      </form>
    );
  }
}