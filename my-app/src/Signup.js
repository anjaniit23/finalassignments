import React ,{Component} from 'react';
import './Signup.css';
import { connect} from 'react-redux';
import {registerUser} from './actions/authActions';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';

// const instance = axios.create({baseURL: "https://localhost:3000"});
 class Signup extends Component  { 
     state={
           name:"",email:"",password:"",password2:"",errors:{}
    
     };
      onChange=(e)=>{
         this.setState({[e.target.name]:e.target.value});
     }
     componentDidMount(){
        if(this.props.auth.isAuthenticated){
              this.props.history.push('/dashboard');
        }
  }
     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({errors:nextProps.errors});
         }
     }

     
     onSave=(e)=>{
         e.preventDefault();
          console.log(this.state);
         const newUser={
             name:this.state.name,
             email:this.state.email,
             password:this.state.password,
             password2:this.state.password2
         };
         this.props.registerUser(newUser,this.props.history);
 
     }
 render(){
  

    return (
        <div className="message">
          
         <div className="signup">
         <form noValidate onSubmit={this.onSave.bind(this)}>
         <div>
          <ul>
            <li>Name</li>
            <li><input id="Name" name="name" type="text" title={this.state.errors.name} value={this.state.name}  onChange={this.onChange.bind(this)} /></li>
            <li className="warntext">{this.state.errors.name}</li>
            <li>Email-Id</li>
            <li><input id="Email-Id" name="email" type="email"  value={this.state.email}  onChange={this.onChange.bind(this)}/></li>
            <li className="warntext">{this.state.errors.email}</li>
            <li>Password</li>
            <li><input id="Password" name="password"  type="password"  value={this.state.password}  onChange={this.onChange.bind(this)} /></li> 
            <li className="warntext">{this.state.errors.password}</li>
            <li>Confirm Password</li>
            <li><input  id="Confirm Password" name="password2" type="password" value={this.state.password2} onChange={this.onChange.bind(this)}/></li>
            <li className="warntext">{this.state.errors.password2}</li>
            <li><button className="btn" >Submit</button></li>
            </ul>
         </div>
         </form>
         </div>
        </div>
       
    );
    }
}

Signup.propTypes={
    registerUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps =(state)=>({
     auth:state.auth,
     errors:state.errors
});
export default connect(mapStateToProps,{ registerUser})(withRouter(Signup));

