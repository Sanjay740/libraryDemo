import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import mainComponent from './components/index';
import NavBar from './components/commonComponent/navBar';
import Footer from './components/commonComponent/footer';
import LoginForm from './components/authentication/login'
import Register from './components/authentication/register'
import adminDashboard from './components/admin/adminDashboard';
import addBook from './components/admin/addBook';
import assigningBook from './components/admin/assignBook'
import history from './history'
import {loginDispactAction} from './action/authAction';
import setAuthToken from './setToken';
import store from './store';
const data = JSON.parse(localStorage.getItem('userData'));
if (data) {
    setAuthToken(data.token);
    store.dispatch(loginDispactAction(data));
}

const NotFound = () => <div>Page not found</div>;
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
                    <Route exact path="/adminDashboard" component={adminDashboard} />
                    <Route exact path="/addBook" component={addBook} />
                    <Route exact path="/addBook/:id" component={addBook} />
                    <Route exact path="/assigningbook" component={assigningBook} />
                    <Route component={NotFound} />
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