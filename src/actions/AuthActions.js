import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import {
    EMAIL_TEXT_CHANGED,
    PASSWORD_TEXT_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START
} from './types';

// this function fires when user typing in an email into the login/register form
export const emailTextChanged = (text) => {
    return {
        type: EMAIL_TEXT_CHANGED,
        payload: text
    };
};

// this function fires when user typing in a password into the login/register form
export const passwordTextChanged = (text) => {
    return {
        type: PASSWORD_TEXT_CHANGED,
        payload: text
    };
};

// this function will attempt to login a user with email and password into firebase,
// the function will start spinner
// if login fails due to not existing user, the function will try to register a new user
// with the email and password provided
export const loginOrRegisterUserWithEmail = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

// this function will log user in with facebook
// it will obtain the user's info from facebook and then perform firebase login
export const loginWithFacebook = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });

        const auth = firebase.auth();
        const provider = firebase.auth.FacebookAuthProvider;

        LoginManager.logInWithReadPermissions(['public_profile'])
            .then(loginResult => {
                if (loginResult.isCancelled) {
                    return loginUserFail(dispatch);
                }
            AccessToken.getCurrentAccessToken()
                .then(accessTokenData => {
                    const credential = provider.credential(accessTokenData.accessToken);
                    return auth.signInWithCredential(credential);
                })
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch));
            });
    };
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
};
