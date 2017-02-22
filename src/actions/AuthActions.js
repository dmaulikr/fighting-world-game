import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';

import {
    EMAIL_TEXT_CHANGED,
    PASSWORD_TEXT_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    EDIT_NAME_TEXT_CHANGED,
    EDIT_EMAIL_TEXT_CHANGED,
    UPDATE_USER_SUCCESS,
    PROFILE_FETCH_SUCCESS,
    NEW_USERNAME_TEXT_CHANGED,
    PASSWORD_RESET_TEXT_CHANGED,
    RECOVER_ACCOUNT,
    PASSWORD_SENT_SUCCESS,
    PASSWORD_SENT_FAIL,
    USERNAME_TEST_RESULT,
    RESET_AUTH,
    PROVIDER_DATA,
    EMAIL_TEXT_CHANGED_DELETE_ACC,
    PASSWORD_TEXT_CHANGED_DELETE_ACC,
    OLD_EMAIL_TEXT_CHANGED_CHANGE_EMAIL,
    NEW_EMAIL_TEXT_CHANGED_CHANGE_EMAIL,
    PASSWORD_TEXT_CHANGED_CHANGE_EMAIL,
    PHOTO_UPLOADING_START,
    PHOTO_UPLOADING_END
} from './types';

////////////////////////////////////////////////////////////// TEXT FIELDS ///////////////////////

// this function fires when user is typing in an email
export const emailTextChanged = text => {
    return {
        type: EMAIL_TEXT_CHANGED,
        payload: text
    };
};

// this function fires when user is typing in a password
export const passwordTextChanged = text => {
    return {
        type: PASSWORD_TEXT_CHANGED,
        payload: text
    };
};

// his function fires when user is typing in email into password reset form
export const passwordResetTextChanged = text => {
    return {
        type: PASSWORD_RESET_TEXT_CHANGED,
        payload: text
    };
};

// this function fires when user is editting name
export const nameTextChanged = text => {
    return {
        type: EDIT_NAME_TEXT_CHANGED,
        payload: text
    };
};

// this function fires when user is editting email
export const editEmailTextChanged = text => {
    return {
        type: EDIT_EMAIL_TEXT_CHANGED,
        payload: text
    };
};


export const emailTextChangedDeleteAcc = text => {
    return {
        type: EMAIL_TEXT_CHANGED_DELETE_ACC,
        payload: text
    };
};


export const passwordTextChangedDeleteAcc = text => {
    return {
        type: PASSWORD_TEXT_CHANGED_DELETE_ACC,
        payload: text
    };
};

export const oldEmailTextChangedChangeEmail = text => {
    return {
        type: OLD_EMAIL_TEXT_CHANGED_CHANGE_EMAIL,
        payload: text
    };
};

export const newEmailTextChangedChangeEmail = text => {
    return {
        type: NEW_EMAIL_TEXT_CHANGED_CHANGE_EMAIL,
        payload: text
    };
};

export const passwordTextChangedChangeEmail = text => {
    return {
        type: PASSWORD_TEXT_CHANGED_CHANGE_EMAIL,
        payload: text
    };
};

/////////////////////////////////////////////////// LOG IN, CREATE PROFILE ///////////////////////

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
          .then(user => {
                firebase.database().ref(`profiles/${user.uid}`).once('value')
                    .then(snapshot => {
                        if (snapshot.exists()) {
                            loginUserSuccess(dispatch, user);
                        } else {
                            Actions.createUsername({ type: 'reset' });
                        }
                    })
                    .catch(err => console.log(err));
                })
          .catch(() => loginUserFail(dispatch));
      });
  };
};

// this function will log user in with facebook
// it will obtain the user's info from facebook and then perform firebase login
// if the user logs in for the first time, the user will be taken to the create username screen
// if user already created a username, user will be taken inside
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
                .then(user => {
                    firebase.database().ref(`profiles/${user.uid}`).once('value')
                        .then(snapshot => {
                            if (snapshot.exists()) {
                                loginUserSuccess(dispatch, user);
                            } else {
                                Actions.createUsername({ type: 'reset' });
                            }
                        })
                        .catch(err => console.log(err));
                })
                .catch(() => {
                    loginUserFail(dispatch);
                });
            });
    };
};

// this function will create a user's username, then create profile, then take user inside
export const createUsernameAndProfileAndLogIn = (username) => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        createUsername(username, currentUser);
        createProfile(dispatch, username, currentUser);
    };
};

const createUsername = (username, currentUser) => {
    firebase.database().ref(`/usernames/${username}`)
        .set(currentUser.uid)
        .then(() => {
            console.log('username set');
        })
        .catch(error => console.log(error));
};

const createProfile = (dispatch, username, currentUser) => {
    const newProfile = {
        fighter: {
            level: 0,
            healthCurrent: 10,
            halthTotal: 10,
            power: 1,
            agility: 1,
        },
        stats: { wins: 0, losses: 0, draws: 0, disconnects: 0 },
        personal: { username },
        currentGame: null,
        pastGames: []
    };
    firebase.database().ref(`/profiles/${currentUser.uid}`)
        .set(newProfile)
        .then(() => {
            console.log('profile created');
            loginUserSuccess(dispatch, currentUser);
        })
        .catch(error => console.log(error));
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    Actions.main({ type: 'reset' });
};

// this function fires when user types in a username
export const newUsernameTextChanged = text => {
    return dispatch => {
        dispatch({ type: NEW_USERNAME_TEXT_CHANGED, payload: text });
        testUsername(dispatch, text);
    };
};

// this function will search usernames database to advise the user if the username
// he/she entered is available or not. The username must be at least two characters long
const testUsername = (dispatch, text) => {
    if (text.length < 2) {
        dispatch({ type: USERNAME_TEST_RESULT, payload: 'Not Available' });
    } else {
        dispatch({ type: USERNAME_TEST_RESULT, payload: 'loading' });
        
        firebase.database().ref(`usernames/${text}`).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    dispatch({ type: USERNAME_TEST_RESULT, payload: 'Not Available' });
                } else {
                    dispatch({ type: USERNAME_TEST_RESULT, payload: 'Available' });
                }
            })
            .catch(error => console.log(error));
    }
};

/////////////////////////////////////////////////// ACCOUNT //////////////////////////////////////

// this function will sign the user out
export const signOut = () => {
    return () => {
        firebase.auth().signOut()
        .then(() => Actions.auth({ type: 'reset' }))
        .catch(error => console.log(error));
    };
};

// this function will send password reset link to user's email
export const recoverAccountTapped = (recoveryEmail) => {
    return (dispatch) => {
        dispatch({ type: RECOVER_ACCOUNT });

        firebase.auth().sendPasswordResetEmail(recoveryEmail)
            .then(() => dispatch({ type: PASSWORD_SENT_SUCCESS }))
            .catch(() => dispatch({ type: PASSWORD_SENT_FAIL }));
    };
};

// this function will return the provider with which the user logged in (i.e. facebook, email, etc)
export const getProvider = () => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        if (currentUser != null) {
            const { providerId } = currentUser.providerData[0];
            dispatch({ type: PROVIDER_DATA, payload: providerId });
        }
    };
};

// this function will delete profile (if exists), then username (if exists), then user
const deleteUser = (dispatch, currentUser) => {
    const { uid } = currentUser;
    let username = null;
    Actions.auth({ type: 'reset' });
    Actions.login({ type: 'reset' });
    firebase.database().ref(`/profiles/${uid}`)
        .once('value', snapshot => {
            if (snapshot.val()) {
                username = snapshot.val().personal.username;
                console.log(username);
                firebase.database().ref('profiles').child(uid).remove();
                console.log('removed profile');
            }
        })
        .then(() => {
            firebase.database().ref(`/usernames/${username}`)
                .once('value', snapshot => {
                    if (snapshot.val()) {
                        firebase.database().ref('usernames').child(username).remove();
                        console.log('removed username');
                    }
                });
        })
        .then(() => {
            currentUser.delete()
                .then(() => {
                    console.log('deleted user');
                    dispatch({ type: RESET_AUTH });
                })
                .catch(error => console.log(error));
        });
};

// this function will perform facebook authentication and delete user and profile
export const reauthenticateWithFaceAndDelete = () => {
    return dispatch => {
        const provider = firebase.auth.FacebookAuthProvider;
        const { currentUser } = firebase.auth();
        LoginManager.logInWithReadPermissions(['public_profile'])
            .then(loginResult => {
                if (loginResult.isCancelled) return console.log('user cancelled');
                AccessToken.getCurrentAccessToken()
                    .then(accessTokenData => {
                        const credential = provider.credential(accessTokenData.accessToken);
                        currentUser.reauthenticate(credential)
                            .then(() => {
                                deleteUser(dispatch, currentUser);
                            })
                            .catch(error => console.log(error));
                    });
            });
    };
};

// this function will perform email/password authentication and delete user and profile
export const reauthenticateWithEmailAndDelete = (em, pa) => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        const credential = firebase.auth.EmailAuthProvider.credential(em, pa);
        currentUser.reauthenticate(credential)
            .then(() => {
                deleteUser(dispatch, currentUser);
            })
            .catch(error => console.log(error));
    };
};

// this function will delete user without authenticating them,
// will error out if user has been logged in for a while
export const deleteWithoutReauthentication = () => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        deleteUser(dispatch, currentUser);
    };
};

// this function will reauthenticate with email/password
// and then update main email
export const reauthenticateWithEmailAndUpdateEmail = (oldEm, newEm, pass) => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        const credential = firebase.auth.EmailAuthProvider.credential(oldEm, pass);
        currentUser.reauthenticate(credential)
            .then(() => {
                updateEmail(dispatch, currentUser, newEm);
            })
            .catch(error => console.log(error));
    };
};

// this function will reauthenticate with facebook
// and then update main email
export const reauthenticateWithFaceAndUpdateEmail = newEm => {
    return dispatch => {
        const provider = firebase.auth.FacebookAuthProvider;
        const { currentUser } = firebase.auth();
        LoginManager.logInWithReadPermissions(['public_profile'])
            .then(loginResult => {
                if (loginResult.isCancelled) return console.log('user cancelled');
                AccessToken.getCurrentAccessToken()
                    .then(accessTokenData => {
                        const credential = provider.credential(accessTokenData.accessToken);
                        currentUser.reauthenticate(credential)
                            .then(() => {
                                updateEmail(dispatch, currentUser, newEm);
                            })
                            .catch(error => console.log(error));
                    });
            });
    };
};

// this function will update email
const updateEmail = (dispatch, currentUser, newEm) => {
    currentUser.updateEmail(newEm)
        .then(() => updateUserSuccess(dispatch, currentUser))
        .catch(error => console.log(error));
};

// this function fires after user has been updated
const updateUserSuccess = (dispatch, user) => {
	dispatch({
		type: UPDATE_USER_SUCCESS,
		payload: user
	});
    dispatch({ type: PHOTO_UPLOADING_END });
    Actions.dashboard({ type: 'reset' });
    Actions.user();
};

/////////////////////////////////////////////////// PROFILE //////////////////////////////////////

// this function will fetch a user's profile
export const fetchProfile = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase.database().ref(`/profiles/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

// this function will update username
export const updateUsername = (username) => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        
        let oldUsername = '';
        firebase.database().ref(`/profiles/${currentUser.uid}`)
            .once('value', snapshot => {
                if (snapshot.val()) {
                    oldUsername = snapshot.val().personal.username;
                }
            })
            .then(() => {
                firebase.database().ref(`profiles/${currentUser.uid}/personal`).set({ username })
                    .then(() => {
                        firebase.database().ref('usernames').child(oldUsername).remove()
                            .then(() => {
                                console.log('removed username');
                                createUsername(username, currentUser);
                            });
                    })
                    .then(() => {
                        updateUserSuccess(dispatch, currentUser);
                    });
            });
    };
};

export const updateUserProfile = (user, displayName) => {
    return dispatch => {
        user.updateProfile({ displayName })
        .then(() => updateUserSuccess(dispatch, user))
        .catch(error => console.log(error));
    };
};

export const chooseAndUploadImage = image => {
    return (dispatch) => {
        dispatch({ type: PHOTO_UPLOADING_START });

        const { currentUser } = firebase.auth();
        const polyfill = RNFetchBlob.polyfill;
        window.XMLHttpRequest = polyfill.XMLHttpRequest;
        window.Blob = polyfill.Blob;
        const path = image.path;

        Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
            .then((blob) => firebase.storage()
                    .ref('images')
                    .child(currentUser.uid)
                    .put(blob, { contentType: 'image/png' })
            )
        .then(snapshot => {
            currentUser.updateProfile({
                photoURL: snapshot.a.downloadURLs[0]
            })
            .then(() => updateUserSuccess(dispatch, currentUser))
            .catch(error => {
                console.log(error);
                dispatch({ type: PHOTO_UPLOADING_END });
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: PHOTO_UPLOADING_END });
        });
    };
};
