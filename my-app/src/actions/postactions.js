import axios from 'axios';

import { GET_ERRORS,ADD_POST,GET_POSTS,POST_LOADING ,DELETE_POST} from './types';


//add post
export const addPost=(postData)=>dispatch=>{
    axios
         .post("/api/posts",postData)
         .then(res=>
            dispatch({
                type:ADD_POST,
                payload:res.data
            }))
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })});
};
//get posts
export const getPosts=()=>dispatch=>{
    //dispatch(setPostLoading());
    axios
         .get("/api/posts")
         .then(res=>
            dispatch({
                type:GET_POSTS,
                payload:res.data
            }))
        .catch(err=>{
            dispatch({
                type:GET_POSTS,
                payload:err.response.data
            })});
};
//add like
export const addLike=(id)=>dispatch=>{
   // dispatch(setPostLoading());
    axios
         .post(`/api/posts/like/${id}`)
         .then(res=>
            dispatch(getPosts()))
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })});
};

//delete post
export const deletePost=(id)=>dispatch=>{
    //dispatch(setPostLoading());
    axios
         .delete(`/api/posts/${id}`)
         .then(res=>
            dispatch({
                type:DELETE_POST,
                payload:id
            }))
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })});
};
//set loading state

export const setPostLoading=()=>{
    return {
        type:POST_LOADING
    }
}




