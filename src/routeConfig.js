import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import mainComponent from './components/index';
import NavBar from './components/commonComponent/navBar';
import Footer from './components/commonComponent/footer';
import adminDashboard from './components/admin/adminDashboard';
import addBook from './components/admin/addBook';
import assigningBook from './components/admin/assignBook'
import history from './history'
import { loginDispactAction, userLoginAction } from './action/authAction';
import setAuthToken from './setToken';
import store from './store';
import AWS from 'aws-sdk'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import AWSConfig from './configs/aws';


const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string',
            custom: false,
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 3,
            type: 'password',
            custom: false,
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 2,
            type: 'string',
            custom: false,
        },
        {
            label: 'User Type',
            key: 'custom:usertype',
            required: true,
            displayOrder: 4,
            type: 'string',
            custom: true,
        }]
}

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: AWSConfig.cognito.REGION,
        identityPoolId: AWSConfig.cognito.IDENTITY_POOL_ID,
        userPoolId: AWSConfig.cognito.USER_POOL_ID,
        userPoolWebClientId: AWSConfig.cognito.APP_CLIENT_ID
    }
});


const NotFound = () => <div>Page not found</div>;
class Routing extends Component {

    constructor(props) {
        super(props)
        this.state= {
            isMounted : false
        }
    }

    
    
    componentDidMount() {
        Auth.currentSession()
            .then(data => {
                let loginurl = 'cognito-idp.' + AWSConfig.cognito.REGION + '.amazonaws.com/' + AWSConfig.cognito.USER_POOL_ID
                // Add the User's Id Token to the Cognito credentials login map.
                AWS.config.region = AWSConfig.cognito.REGION;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: AWSConfig.cognito.IDENTITY_POOL_ID,
                    Logins: {
                        [loginurl]: data.getIdToken().getJwtToken()
                    }
                });
                if (data.idToken) {                    
                    store.dispatch(userLoginAction(data.idToken.payload));
                    this.setState({isMounted : true })
                }
            })
            .catch(err => {
                console.log(err)
            });

    }
    // const Routing = () => {
    render() {
        return (
            // return (
            <Router >
                <div>
                    <NavBar />
                    <section >
                        <div >
                            <Switch>
                                {this.state.isMounted ? <Route exact path="/" component={mainComponent} /> : null}
                                <Route exact path="/adminDashboard" component={adminDashboard} />
                                <Route exact path="/addBook" component={addBook} />
                                <Route exact path="/addBook/:id" component={addBook} />
                                <Route exact path="/assigningedbook" component={assigningBook} />
                                <Route component={NotFound} />
                </Switch>
                        </div>
                    </section>
                    <Footer />
                </div>
            </Router>
        )
    }
}

let AppWrapper = withAuthenticator(Routing, { signUpConfig })

export default AppWrapper;
// export default Routing;