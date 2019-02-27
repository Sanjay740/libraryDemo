import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux';
import { loginDispactAction, logoutDispatchAction } from '../action/authAction';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let response = nextProps.auth
        console.log("componentWillReceiveProps", response)
        if (response.isLogin == false) {
            this.setState({ isUserLogin: false });
        }
        else {
            this.setState({ isUserLogin: JSON.parse(response).isLogin });
        }
    }

    componentDidMount() {
        const data = localStorage.getItem('userData');
        if (data != null) {
            this.props.dispatch(loginDispactAction(data));
        }
        else {
            this.setState({ isUserLogin: false });
        }


    }
    logout() {
        this.props.dispatch(logoutDispatchAction());
    }

    myFunction() {
        console.log(this)
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    render() {
        return (
            <div className="topnav" id="myTopnav">
                <Link to={`/`} className="active">Home</Link>
                {!this.state.isUserLogin ? <Link to={`/memberLogin`} >Login</Link> : null}
                {!!this.state.isUserLogin ? <div className="dropdown">
                    <button className="dropbtn">Dropdown
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>  : null}             
                <a href="javascript:void(0);" className="icon" onClick={this.myFunction.bind(this)}>&#9776;</a>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

