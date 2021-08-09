import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deletePost,addLike} from './actions/postactions';


class PostItem extends Component {

    onDelete(id){
        console.log("in delete section");
        this.props.deletePost(id);
    }
    
    onLike(id){

        this.props.addLike(id);
   

    }
        render() {
            const {post,auth}=this.props;
            return (
                <div>
                    <div className="post">
                    <div className="upper">
                      <p className="postusername">
                          <img src={post.avatar} alt=""/>&nbsp;{post.name}
                      </p>
                       {post.user===auth.user.id?(<button type="button" onClick={this.onDelete.bind(this,post._id)} className="delete" >&#10062;</button>):null}
                    </div>
                    <p className="postcontent">{post.text}</p>
                       <div className="likes">
                        <button type="button" onClick={this.onLike.bind(this,post._id)} >&#128077;</button>
                        <p className="textlike">{post.likes.length}</p>
                        </div>
                    </div>
                </div>
            )
        }
    };

PostItem.propTypes={
    deletePost:PropTypes.func.isRequired,
    addLike:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,   
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}   

const mapStateToProps=state=>({
    auth:state.auth

});
    
export default connect(mapStateToProps,{deletePost,addLike})(PostItem)
    