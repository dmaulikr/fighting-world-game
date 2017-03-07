import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import User from './components/User';
import EditUser from './components/EditUser';
import CreateUsername from './components/CreateUsername';
import ForgotPassword from './components/ForgotPassword';
import ViewPerson from './components/ViewPerson';
import Friends from './components/Friends';

import {
    deleteWithoutReauthentication,
    viewUser,
    emptyPeople,
    unViewPerson
} from './actions';

const RouterComponent = props => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please Login" initial />
                <Scene
                    key="createUsername"
                    component={CreateUsername}
                    title="Create Username"
                    leftTitle="Back"
                    onLeft={() => props.deleteWithoutReauthentication()}
                />
                <Scene key="forgotPassword" component={ForgotPassword} title="Password Reset" />
            </Scene>

            <Scene key="main">
                <Scene
                    onRight={() => props.viewUser()}
                    rightTitle="User"
                    key="dashboard"
                    component={Dashboard}
                    title="Dashboard"
                    initial
                />
                <Scene
                    key="viewPerson"
                    component={ViewPerson}
                    onBack={() => onBackPerson(props)}
                />
                <Scene
                    onRight={() => Actions.editUser()}
                    rightTitle="Edit"
                    key="user"
                    component={User}
                    title={() => getOwnUsername()}
                />
                <Scene
                    key="editUser"
                    component={EditUser}
                    title="Edit User"
                />
                <Scene
                    key="friends"
                    component={Friends}
                    onBack={() => onBackFriends(props)}
                />
            </Scene>
        </Router>
    );
};

const onBackFriends = props => {
    //props.emptyPeople();
    Actions.pop();
};
const onBackPerson = props => {
    Actions.pop();
    props.unViewPerson();
};

const getOwnUsername = () => {
    console.log('getOwnUsername fired')
    let title = 'Profile';
    const { currentUser } = firebase.auth();
        firebase.database().ref(`/profiles/${currentUser.uid}`)
            .on('value', snapshot => {
                title = snapshot.val().personal.username;
            });
    return title;
};

export default connect(null, { deleteWithoutReauthentication, viewUser, emptyPeople, unViewPerson })(RouterComponent);
