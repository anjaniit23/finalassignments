  
import React ,{Component} from 'react';
// import { findAllInRenderedTree } from 'react-dom/test-utils';
import './Signup.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUser } from './actions/authActions';
import { withRouter} from 'react-router-dom';



  
class Signin extends Component  {
        state={
              email:"",password:"",errors:{}
         
          }
        onChange=(e)=>{
              this.setState({[e.target.name]:e.target.value});
        }
        componentDidMount(){
              if(this.props.auth.isAuthenticated){
                    this.props.history.push('/dashboard');
              }
        }
        componentWillReceiveProps(nextProps){
              
              if(nextProps.auth.isAuthenticated){
                    this.props.history.push('/dashboard');

              }
              if(nextProps.errors){
                  this.setState({errors:nextProps.errors});
              }
        }
        onSave=(e)=>{
              e.preventDefault();
              const loggedInUser={
                  
                  email:this.state.email,
                  password:this.state.password
              }
              
             this.props.loginUser(loggedInUser);
        }
  render(){
        return (
            <div className="message">
            <div className="signin">
            <form noValidate onSubmit={this.onSave.bind(this)}>
            <div>
             <ul>
               <li>Email-Id</li>
               <li><input id="Email-Id" name="email" type="email"  value={this.state.email}  onChange={this.onChange.bind(this)}/></li>
               <li className="warntext">{this.state.errors.email}</li>
               <li>Password</li>
               <li><input id="Password" name="password"  type="password"  value={this.state.password}  onChange={this.onChange.bind(this)} /></li> 
               <li className="warntext">{this.state.errors.password}</li>
               <li><button className="btn" >Submit</button></li>
               </ul>
            </div>
            </form>
            </div>
           </div>
        );
}}
Signin.propTypes={
      loginUser:PropTypes.func.isRequired,
      auth:PropTypes.object.isRequired,
      errors:PropTypes.object.isRequired
}
            
const mapStateToProps=(state)=>({
      auth:state.auth,
      errors:state.errors
})

export default connect(mapStateToProps,{loginUser})(withRouter(Signin));