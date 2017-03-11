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
    PHOTO_UPLOADING_END,
    USERNAMES_FETCH_SUCCESS,
    SET_REQ_ICON,
    FETCH_FRIENDS_SUCCESS,
    EMPTY_PEOPLE,
    FETCH_FRIEND_REQS_SUCCESS,
    FETCH_FRIEND_SENT_SUCCESS,
    VIEW_A_PERSON,
    PLAYER_SEARCH_TEXT_CHANGED,
    FETCH_PLAYERS_SUCCESS,
    FRIEND_SEARCH_TEXT_CHANGED,
    NOTIFICATIONS_MODAL
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
  passwordChangeEmail: '',
  usernames: null,
  areFriends: '',
  friends: {},
  friendReqs: {},
  friendSent: {},
  personToView: null,
  allPlayers: null,
  searchPlayerText: '',
  searchFriendText: '',
  notificationsVisible: false
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
    case USERNAMES_FETCH_SUCCESS:
      return { ...state, usernames: action.payload };
    case SET_REQ_ICON:
      return { ...state, areFriends: action.payload };
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, friends: { ...state.friends, [action.payload.key]: action.payload.friend } };
    case EMPTY_PEOPLE:
      return { ...state, friends: {}, friendReqs: {}, friendSent: {} };
    case FETCH_FRIEND_REQS_SUCCESS:
      return { ...state, friendReqs: { ...state.friendReqs, [action.payload.key]: action.payload.friendReq } };
    case FETCH_FRIEND_SENT_SUCCESS:
      return { ...state, friendSent: { ...state.friendSent, [action.payload.key]: action.payload.friendSent } };
    case VIEW_A_PERSON:
      return { ...state, personToView: action.payload };
    case PLAYER_SEARCH_TEXT_CHANGED:
      return { ...state, searchPlayerText: action.payload };
    case FRIEND_SEARCH_TEXT_CHANGED:
      return { ...state, searchFriendText: action.payload };
    case FETCH_PLAYERS_SUCCESS:
      return { ...state, allPlayers: action.payload };
    case NOTIFICATIONS_MODAL:
      return { ...state, notificationsVisible: action.payload };
    default:
      return state;
  }
};
