import React,{Component} from 'react';
import './Dashboard.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import { logoutUser } from './actions/authActions';
import {addPost} from './actions/postactions';
import { withRouter } from 'react-router';

class Postform extends Component{
   constructor(props){
       super(props);
       this.state={
         text:"",errors:{}
      }

   }
   
   
   onChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});

   }
   componentWillReceiveProps=(newProps)=>{
      if(newProps.errors){
         this.setState({errors:newProps.errors})

      }

   }
   onSubmit=(e)=>{
      e.preventDefault();
      console.log(this.props);
      const {user}=this.props.auth;
      console.log("yeah,inside the onsumbit");
      const newPost={
         text:this.state.text,
         name:user.name,
         avatar:user.avatar
      };
      this.props.addPost(newPost);
      this.setState({text :'',errors:{}});
      
   }
 render(){

    return(
        <div >
           <div className="posttitle" >
              <form onSubmit={this.onSubmit.bind(this)}>
              <ul>
               <li className="headingtext">Enter Your Post</li>
               <li><input name="text" className="inputbox" type="textbox" value={this.state.text} onChange={this.onChange.bind(this)} /></li>
               <li className="warntext">{this.state.errors.text}</li>
               <li><button className="btn" type="submit" >Submit</button></li>
               </ul>
               </form>
           </div>
        </div>
    ); }
 }
Postform.propTypes={
   addPost:PropTypes.func.isRequired,
   auth:PropTypes.object.isRequired,
   errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
   auth:state.auth,
   errors:state.errors
})

 export default connect(mapStateToProps,{addPost})(withRouter(Postform));