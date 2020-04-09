import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from "./types"

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payloads: err.response.data.errors
            })
        });
}


export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //take the token
            const { token } = res.data;
            //set token to local storage
            localStorage.setItem('jwtToken', token);
            //set token to Auth header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payloads: err.response.data.errors
            })
        });
}


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payloads: decoded
    }
}