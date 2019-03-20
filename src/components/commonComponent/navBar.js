import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { connect } from 'react-redux';
import {  logoutDispatchAction } from '../../action/authAction';
import Amplify, { Auth } from 'aws-amplify'
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false,
            isUserType: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.auth.data != null) {
            if ((!!nextProps.auth.isEmailExist) && (!!nextProps.auth.success)) {
                if (!!nextProps.auth.isUserAuthenticate) {
                    this.setState({ isUserLogin: nextProps.auth.isUserAuthenticate, isUserType: nextProps.auth.userType });
                }
                else {
                    this.setState({ isUserLogin: false });
                }
            }
            else {
                this.setState({ isUserLogin: false });
            }
        }
    }

    

    logout() {
        Auth.signOut().then(() => {            
            this.props.dispatch(logoutDispatchAction());
        });
       
    }


    myFunction() {
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
                {((!!this.state.isUserLogin || !this.state.isUserLogin) && (this.state.isUserType == 'user')) ? <Link to={`/`} className="active">Home</Link> : <Link to={`/adminDashboard`} className="active">Home</Link>}
                {((!!this.state.isUserLogin) && (this.state.isUserType != 'user')) ? <Link to={`/addBook`}>AddBook</Link> : null}
                {!!this.state.isUserLogin && (this.state.isUserType == 'user') ? <Link to={`/assigningedbook`} >Assigned Book</Link> : null}
                {!this.state.isUserLogin ? <Link to={`/register`} className="registerClass">Register</Link> : null}
                {!!this.state.isUserLogin ? <div className="dropdown">               
                    <button onClick={this.logout.bind(this)} className="dropbtn">Logout
                    </button>
                </div> : null}
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

