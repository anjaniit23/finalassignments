import React,{Component} from 'react';
import './Dashboard.css';
import Postform from './postform';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from './actions/postactions';
import PostFeed from './postfeed';

class Posts extends Component {

  componentDidMount(){
    this.props.getPosts();
  }
render(){
   
     const { posts , loading}=this.props.post;
     let postContent;

     if(posts===null||loading){
         postContent="No posts till Date!";
     }else{
       postContent=<PostFeed posts={posts}/>
     }
      return(
          <div>
            
            <Postform/>
            <div className='cardBody'>
            {postContent} 
            </div>
           
          </div>

      );

}};

Posts.propTypes={
  getPosts:PropTypes.func.isRequired,
  post:PropTypes.object.isRequired,

}
const mapStateToProps=state=>({
  post:state.post
});
export default connect(mapStateToProps,{getPosts})(Posts)


