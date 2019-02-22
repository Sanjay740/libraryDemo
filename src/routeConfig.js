import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import mainComponent from './components/index';
import NavBar from './components/navBar';

// const Routing= 
const Routing = () => {
    return (
<Router>
    <div>
        <NavBar />
        <section >
            <div >
                <Switch>
                    <Route exact path="/" component={mainComponent} />
                    {/* <Route exact path="/jobs/new" component={JobForm} />
                    <Route path="/jobs/:jobId" component={JobDetail} />
                    <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin.bind(this)} />} /> */} */}
                </Switch>
            </div>
        </section>
    </div>
</Router>
    )}

export default  Routing;