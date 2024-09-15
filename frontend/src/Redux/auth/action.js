// import { useDispatch } from "react-redux";
// import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { auth, provider } from '../../firebase/firebase.config'
import { signInWithPopup} from 'firebase/auth'

export const SIGNIN_GOOGLE_REQUEST = 'SIGNIN_GOOGLE_REQUEST';
export const SIGNIN_GOOGLE_SUCCESS = 'SIGNIN_GOOGLE_SUCCESS';
export const SIGNIN_GOOGLE_FAILURE = 'SIGNIN_GOOGLE_FAILURE';


export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';

export const SET_REQUEST = 'SET_REQUEST';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_FAILURE = 'SET_FAILURE';

export const UPDATE_PASS_REQUEST = 'UPDATE_PASS_REQUEST';
export const UPDATE_PASS_SUCCESS = 'UPDATE_PASS_SUCCESS';
export const UPDATE_PASS_FAILURE = 'UPDATE_PASS_FAILURE';

export const CHANGGE_PASS_REQUEST = 'CHANGGE_PASS_REQUEST';
export const CHANGGE_PASS_SUCCESS = 'CHANGGE_PASS_SUCCESS';
export const CHANGGE_PASS_FAILURE = 'CHANGGE_PASS_FAILURE';

const BASE_URL = process.env.REACT_APP_SERVER_URL;



const SignInGoogleRequest = () => {
    return {
        type: SIGNIN_REQUEST
    }
}
const SignInGoogleSuccess = (payload) => {
    console.log('googl payload',payload)
    return {
        type: SIGNIN_SUCCESS,
        payload
    }
}
const SignInGoogleFailure = () => {
    return {
        type: SIGNIN_FAILURE
    }
}
export const signInGoogle = () => async (dispatch) => {
    try {
        dispatch(SignInGoogleRequest());
        const { user } = await signInWithPopup(auth, provider);
        console.log('google',user.displayName)
        localStorage.setItem('userId', user.email);
        dispatch(SignInGoogleSuccess(user.displayName))
        return {status: true}
    }
    catch (error) {
        dispatch(SignInGoogleFailure())
        return {status:false}
    }

}



const SignInRequest = () => {
    return {
        type: SIGNIN_REQUEST
    }
}
const SignInSuccess = (payload) => {
    return {
        type: SIGNIN_SUCCESS,
        payload,
    }
}
const SignInFailure = () => {
    return {
        type: SIGNIN_FAILURE
    }
}
export const signIn = (formData) => async (dispatch) => {
    try {
        dispatch(SignInRequest());
        const res = await fetch(`${BASE_URL}/user`);
        const users = await res.json();
        const userdata = users.find(u => u.email === formData.email && u.password === formData.password);
        localStorage.setItem('userId', userdata.id);
        dispatch(SignInSuccess({ status: true }))
        fetchUserData(userdata.id)(dispatch);
        return { status: true }

    }
    catch (error) {
        dispatch(SignInFailure())
        return { status: false }
    }
};



const SignUpRequest = () => {
    return {
        type: SIGNUP_REQUEST
    }
}
const SignUpSuccess = (payload) => {
    return {
        type: SIGNUP_SUCCESS,
        payload,

    }
}
const SignUpFailure = () => {
    return {
        type: SIGNUP_FAILURE
    }
}
export const signUp = (formData) => async (dispatch) => {
    try {
        dispatch(SignUpRequest());
        const emailCheckResponse = await fetch(`${BASE_URL}/user?email=${formData.email}`);
        const existingUser = await emailCheckResponse.json();

        if (existingUser.length > 0) {
            dispatch(SignUpFailure());
            return { status: false }

        } else {
            const signUpResponse = await fetch(`${BASE_URL}/user`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const user = await signUpResponse.json();
            dispatch(SignUpSuccess(user));
            return { status: true }
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        dispatch(SignUpFailure());
    }
};



// Single user fetch details
const SetInRequest = () => {
    return {
        type: SET_REQUEST
    }
}
const SetInSuccess = (payload) => {
    return {
        type: SET_SUCCESS,
        payload,

    }

}
const SetInFailure = (payload) => {
    return {
        type: SET_FAILURE,
        payload,

    }

}
export const fetchUserData = (userId) => (dispatch) => {
    dispatch(SetInRequest());
    axios.get(`${BASE_URL}/user/${userId}`)
        .then((response) => dispatch(SetInSuccess(response.data)))
        .catch((err) => dispatch(SetInFailure(err)))
};



// update profile 
const UpdateRequest = () => {
    return {
        type: UPDATE_REQUEST
    }
}
const UpdateSuccess = (payload) => {
    return {
        type: UPDATE_SUCCESS,
        payload,
    }
}
const UpdateFailure = () => {
    return {
        type: UPDATE_FAILURE
    }
}
export const UpdateProf = (id, data) => (dispatch) => {
    dispatch(UpdateRequest());
    axios.put(`${BASE_URL}/user/${id}`, data)
        .then((res) => dispatch(UpdateSuccess(res.data)))
        .catch((err) => dispatch(UpdateFailure(err.data)))


}


// verify email to reset password
const updateRequestEmail = () => {
    return {
        type: UPDATE_PASS_REQUEST
    }
}
const updateSuccessEmail = (payload) => {
    return {
        type: UPDATE_PASS_SUCCESS,
        payload
    }
}
const updateFailureEmail = () => {
    return {
        type: UPDATE_PASS_FAILURE
    }
}
export const RequestchangePassword = (emailData) => async (dispatch) => {
    dispatch(updateRequestEmail());
    try {
        const response = await axios.get(`${BASE_URL}/user`);
        const details = response.data;
        let userData = details.find(user => user.email === emailData.email);
        if (userData) {
            dispatch(updateSuccessEmail(userData));
            return { status: true };
        } else {
            dispatch(updateFailureEmail('user not found'));
            return { status: false };
        }
    } catch (error) {
        console.error('Error:', error);
        dispatch(updateFailureEmail('error fetching user details'));
        return { status: false };
    }
};



// new password
const changeRequestPassword = () => {
    return {
        type: CHANGGE_PASS_REQUEST
    }
}
const changeSuccessPassword = (payload) => {
    return {
        type: CHANGGE_PASS_SUCCESS,
        payload
    }
}
const changeFailurePassword = () => {
    return {
        type: CHANGGE_PASS_FAILURE
    }
}
export const Changepassword = (id, data) => (dispatch) => {
    dispatch(changeRequestPassword());
    axios.put(`${BASE_URL}/user/${id}`, data)
        .then((res) => {
            dispatch(changeSuccessPassword(res.data))
        })
        .catch((err) => dispatch(changeFailurePassword(err.data)))


}