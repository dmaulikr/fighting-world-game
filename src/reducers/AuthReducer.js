import {
    EMAIL_TEXT_CHANGED,
    PASSWORD_TEXT_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    EDIT_NAME_TEXT_CHANGED,
    EDIT_USERNAME_TEXT_CHANGED,
    EDIT_EMAIL_TEXT_CHANGED,
    UPDATE_USER_SUCCESS,
    USER_PERSONAL_FETCH_SUCCESS,
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
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  passwordResetError: '',
  success: '',
  loading: false,
  displayName: '',
  username: '',
  editEmail: '',
  personalInfo: null,
  fighter: null,
  newUsername: '',
  passwordResetText: '',
  usernameTestResult: '',
  providerData: '',
  credential: null,
  emailDeleteAcc: '',
  passwordDeleteAcc: '',
  oldEmailChangeEmail: '',
  newEmailChangeEmail: '',
  passwordChangeEmail: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_TEXT_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_TEXT_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case EDIT_NAME_TEXT_CHANGED:
      return { ...state, displayName: action.payload };
    case EDIT_USERNAME_TEXT_CHANGED:
      return { ...state, username: action.payload };
    case EDIT_EMAIL_TEXT_CHANGED:
      return { ...state, editEmail: action.payload };
    case UPDATE_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case USER_PERSONAL_FETCH_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case PROFILE_FETCH_SUCCESS:
      return { ...state, profile: action.payload };
    case NEW_USERNAME_TEXT_CHANGED:
      return { ...state, newUsername: action.payload };
    case PASSWORD_RESET_TEXT_CHANGED:
      return { ...state, passwordResetText: action.payload };
    case RECOVER_ACCOUNT:
      return { ...state, loading: true, error: '', passwordResetError: '', success: '' };
    case PASSWORD_SENT_SUCCESS:
      return { ...state, loading: false, error: '', passwordResetError: '', success: 'Password Sent' };
    case PASSWORD_SENT_FAIL:
      return { ...state, loading: false, passwordResetError: 'Failed to Send Password', success: '', passwordResetText: '' };
    case USERNAME_TEST_RESULT:
      return { ...state, usernameTestResult: action.payload };
    case RESET_AUTH:
      return { ...INITIAL_STATE };
    case PROVIDER_DATA:
      return { ...state, providerData: action.payload };
    case EMAIL_TEXT_CHANGED_DELETE_ACC:
      return { ...state, emailDeleteAcc: action.payload };
    case PASSWORD_TEXT_CHANGED_DELETE_ACC:
      return { ...state, passwordDeleteAcc: action.payload };
    case OLD_EMAIL_TEXT_CHANGED_CHANGE_EMAIL:
      return { ...state, oldEmailChangeEmail: action.payload };
    case NEW_EMAIL_TEXT_CHANGED_CHANGE_EMAIL:
      return { ...state, newEmailChangeEmail: action.payload };
    case PASSWORD_TEXT_CHANGED_CHANGE_EMAIL:
      return { ...state, passwordChangeEmail: action.payload };
    case PHOTO_UPLOADING_START:
      return { ...state, loadingPhoto: true };
    case PHOTO_UPLOADING_END:
      return { ...state, loadingPhoto: false };
    default:
      return state;
  }
};
