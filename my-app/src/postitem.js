import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addLike } from './actions/postactions';
import like from "./like.png";
import del from "./del2.png";

class PostItem extends Component {

    onDelete(id,e) {
        e.preventDefault();
        console.log("in delete section",e);
        this.props.deletePost(id);
    }

    onLike(id,e) {
        e.preventDefault();
        console.log("in like section",e);
        this.props.addLike(id);


    }
    render() {
        const { post, auth } = this.props;
        return (
            <div>
                <div className="post">
                    <div style={{ padding: '3% 0% 0% 0%' }} className="upper">

                        <p className="postusername">
                            <img src={post.avatar} alt="" />&nbsp;{post.name}
                        </p>
                        {post.user === auth.user.id ? (<button style={{ width: '25px', height: '25px', backgroundColor: 'black(34,45,0.6)', margin: "2% 4% 0 0" }} type="button" onClick={this.onDelete.bind(this, post._id)} className="delete" ><img width="100%" height="100%" src={del} alt="delete" /></button>) : null}
                    </div> <br />
                    <div style={{ padding: '0 5%' }} className="postcontent"><p>{post.text}</p></div> <br />
                    <div className="likes">
                        <button type="button" style={{ width: '30px', height: '25px', backgroundColor: 'black(34,45,0.6)' }} onClick={this.onLike.bind(this, post._id)} ><img width="100%" height="100%" src={like} alt="like" /></button>

                        <p className="textlike">{post.likes.length}</p>
                    </div><br />
                </div>
            </div>
        )
    }
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth

});

export default connect(mapStateToProps, { deletePost, addLike })(PostItem)
