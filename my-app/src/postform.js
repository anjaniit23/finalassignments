import React, { Component } from 'react';
import './Dashboard.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logoutUser } from './actions/authActions';
import { addPost } from './actions/postactions';
import { withRouter } from 'react-router';

class Postform extends Component {
   constructor(props) {
      super(props);
      this.state = {
         text: "", errors: {}
      }

   }


   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });

   }
   componentWillReceiveProps = (newProps) => {
      if (newProps.errors) {
         this.setState({ errors: newProps.errors })

      }

   }
   onSubmit = (e) => {
      e.preventDefault();
      console.log("E",e);
      const { user } = this.props.auth;
      console.log("yeah,inside the onsumbit");
      const newPost = {
         text: this.state.text,
         name: user.name,
         avatar: user.avatar
      };
      this.props.addPost(newPost);
      this.setState({ text: '', errors: {} });

   }
   render() {

      return (
         <div >
            <div className="posttitle" >
               <form onSubmit={this.onSubmit.bind(this)}>
                  <ul>
                     <li className="headingtext">Enter Your Post</li>
                     {/* <li><input name="text" className="inputbox" type="textbox" value={this.state.text} onChange={this.onChange.bind(this)} /></li> */}
                     <li><textarea name="text"  className="inputbox" value={this.state.text} onChange={this.onChange.bind(this)}>Enter text here...</textarea></li>
                     <li style={{ width: '100%', justifyContent: 'centre' }} className="warntext2">{this.state.errors.text}</li>
                     <li><button className="btnSubmit" type="submit" >Submit</button><br /></li>

                  </ul>
               </form>
            </div>
         </div>
      );
   }
}
Postform.propTypes = {
   addPost: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors
})

export default connect(mapStateToProps, { addPost })(withRouter(Postform));