import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default class NavBar extends Component {

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
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div >
        )
    }
}

