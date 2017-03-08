import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import User from './components/User';
import EditUser from './components/EditUser';
import CreateUsername from './components/CreateUsername';
import ForgotPassword from './components/ForgotPassword';
import ViewPerson from './components/ViewPerson';
import Friends from './components/Friends';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please Login" initial />
                <Scene
                    key="createUsername"
                    component={CreateUsername}
                    title="Create Username"
                />
                <Scene key="forgotPassword" component={ForgotPassword} title="Password Reset" />
            </Scene>

            <Scene key="main">
                <Scene
                    onRight={() => Actions.user()}
                    rightTitle="User"
                    key="dashboard"
                    component={Dashboard}
                    title="Dashboard"
                    initial
                />
                <Scene
                    key="viewPerson"
                    component={ViewPerson}
                    onBack={() => backToFriends()}
                />
                <Scene
                    onRight={() => Actions.editUser()}
                    rightTitle="Edit"
                    key="user"
                    component={User}
                    title={getOwnUsername}
                />
                <Scene
                    key="editUser"
                    component={EditUser}
                    title="Edit User"
                />
                <Scene
                    key="friends"
                    component={Friends}
                    leftTitle="Home"
                    onLeft={() => Actions.dashboard({ type: 'reset' })}
                />
            </Scene>
        </Router>
    );
};

const backToFriends = () => {
    Actions.friends({ type: 'reset' });
};

const getOwnUsername = () => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/profiles/${currentUser.uid}`)
        .on('value', snapshot => {
            const { username } = snapshot.val().personal;
            Actions.refresh({ title: username });
        });
};

export default RouterComponent;
