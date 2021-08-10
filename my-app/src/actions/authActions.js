import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//Register user
export const registerUser =(userData,history)=>dispatch=>{
   axios.post(`/api/users/register`, userData)
    .then(res=>{history.push('/SignIn');alert("succesfully registered");})
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};
// // inside the state componet of SignUp.js..we could have used this.props.history.push('/Signin');
// to direct tio login page whenever the Signup is done
//login get user token
export const loginUser=userData=>dispatch=>{
    axios.post(`/api/users/login`,userData)
         .then(res=>{
            
             //save to localstorage
             const token = res.data.token1;
         
             //set token to ls
             localStorage.setItem('jwtToken',token);
             //set token to auth header
             setAuthToken(token);
             // decode token to get user data
             const decoded= jwt_decode(token);
             //set current user
             dispatch(setCurrentUser(decoded));
             alert("succesfully loggedin ");
         })
         .catch(err=>{

            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })});
};

//set logged in user
export const setCurrentUser=(decoded)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}
// log user out
export const logoutUser=()=>dispatch=>{
    //remove token from localstorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false);
    //set current user to {} which will set isAutheticated to false
    dispatch(setCurrentUser({}));
}
