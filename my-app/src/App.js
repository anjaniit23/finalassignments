import React,{Component} from 'react';
import Signup from './Signup.js';
import SignIn from './SignIn.js';
import Navbar from './Navbar.js';
import Posts  from './Post.js';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken.js';
import jwt_decode from 'jwt-decode';
import { logoutUser, setCurrentUser } from './actions/authActions.js';

//check for token and een if we switch pages and efresh it it wont affect the localstorgae jwttoken
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currenttime= Date.now()/1000;
  if(decoded.exp<currenttime){
    //logout user
    store.dispatch(logoutUser());
    //redirect to login page
    window.location.href='/Signin';
  }
}
class App extends Component {
render(){
 
  return (
    
    <Provider store={store}>
      <div className="app">
      <Router>
        <div className="navbardiv">
        <Route  path="/"  component={Navbar}/>
        </div>
        <div className="restpagestdiv">
          <Switch><Route exact path="/dashboard"  component={Posts}/></Switch>
          <Switch><Route exact path="/Signup" component={Signup}/></Switch>
          <Switch><Route exact path="/SignIn" component={SignIn}/></Switch>
        </div>
      </Router>
      </div>
    </Provider>
  );
}}

export default App;