import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import mainComponent from './components/index';
import NavBar from './components/commonComponent/navBar';
import Footer from './components/commonComponent/footer';
import LoginForm from './components/authentication/login'
import Register from './components/authentication/register'
import history from './history'
// const Routing= 
const Routing = () => {
    return (
<Router  history={history}>
    <div>
        <NavBar />
        <section >
            <div >
                <Switch>
                    <Route exact path="/" component={mainComponent} />
                    <Route exact path="/memberLogin" component={LoginForm} />
                    <Route exact path="/register" component={Register} />
                    {/* <Route path="/jobs/:jobId" component={JobDetail} />
                    <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin.bind(this)} />} /> */} */}
                </Switch>
            </div>
        </section>
        <Footer />
    </div>
</Router>
    )}

export default  Routing;