import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux';
import {loginDispactAction ,logoutDispatchAction}  from '../action/authAction'

class NavBar extends Component {
    constructor(props)
    {
        super(props)

        this.state = { 
            isUserLogin: false
        }
    }

    componentWillReceiveProps(nextProps) {
      let response = nextProps.auth
        let isLogin = JSON.parse(response).isLogin
        this.setState({isUserLogin : isLogin});
    }

    componentDidMount()
    {
        const data = localStorage.getItem('userData');
        if(data != null)
        {
            console.log(data)
            this.props.dispatch(loginDispactAction(data));            
        }

    }
     logout()
     {        
        this.props.dispatch(logoutDispatchAction())
        // this.props.history
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
            <div>
                <div className="topnav" id="myTopnav">                
                <Link to={`/`} className="active">Home</Link>                
                { !this.state.isUserLogin ?<Link  to={`/memberLogin`} className="active" >Login</Link>  : null }
                { this.state.isUserLogin ? <button  to={`/`} onClick={this.logout} className="active">Logout</button>: null }                     
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => ({   
    auth: state.auth.loginCredential, 
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps , mapDispatchToProps)(NavBar)

