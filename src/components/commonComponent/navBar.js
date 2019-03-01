import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { connect } from 'react-redux';
import { loginDispactAction,adminLoginDispactAction, logoutDispatchAction,adminlogoutDispatchAction } from '../../action/authAction';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false,
            isAdminLogin: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let response = nextProps.auth
        console.log(response);
        if (response.isLogin == false ) {
            this.setState({ isUserLogin: false, isAdminLogin :false });
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
        const adminData = localStorage.getItem('adminData');
        if(adminData != null)
        {
            this.props.dispatch(adminLoginDispactAction(adminData));
        }
        else
        {
            this.setState({ isUserLogin: false });
        }
        console.log(this.state)
    }


    }
    logout() {
        if(!!this.state.isUserLogin)
        {
        this.props.dispatch(logoutDispatchAction());
        }
        else
        {
            this.state.dispatch(adminlogoutDispatchAction())
        }
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
                {!this.state.isUserLogin && !this.state.isAdminLogin  ? <Link to={`/memberLogin`} >Login</Link> : null}
                {!!this.state.isUserLogin && (this.state.isAdminLogin == false)? <Link to={`/memberLogin`} >Assigned Book</Link> : null}
                {!!this.state.isUserLogin && (this.state.isAdminLogin == false)? <Link to={`/memberLogin`} >Returned Book</Link> : null}
                {!this.state.isUserLogin && !this.state.isAdminLogin ? <Link to={`/register`} className="registerClass">Register</Link> : null}
              {!!this.state.isUserLogin || !!this.state.isAdminLogin ? <div className="dropdown">
                    <button onClick={this.logout.bind(this)} className="dropbtn">Logout
                    </button>                   
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

