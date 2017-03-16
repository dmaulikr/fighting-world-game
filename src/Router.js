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
import AllPlayers from './components/AllPlayers';
import Messages from './components/Messages';
import Drawer from './components/Drawer';
import PlayHome from './components/PlayHome';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navStyle}>
            <Scene key="auth">
                <Scene
                    key="login"
                    component={LoginForm}
                    title="Please Login"
                    sceneStyle={{ paddingTop: 65 }}
                    initial
                />

                <Scene
                    key="createUsername"
                    component={CreateUsername}
                    title="Create Username"
                    sceneStyle={{ paddingTop: 65 }}
                />
                <Scene
                    key="forgotPassword"
                    component={ForgotPassword}
                    title="Password Reset"
                    sceneStyle={{ paddingTop: 65 }}
                />
            </Scene>

            <Scene key="main">
                <Scene
                    key="drawer"
                    component={Drawer}
                    hideNavBar
                >
                    <Scene
                    key="dashboard"
                    component={Dashboard}
                    sceneStyle={{ paddingTop: 20 }}
                    initial
                    />
                    <Scene
                        key="user"
                        component={User}
                        onRight={() => Actions.editUser()}
                        rightTitle="Edit"
                        title={getOwnUsername}
                        sceneStyle={{ paddingTop: 20 }}
                    />
                    <Scene
                    key="viewPerson"
                    component={ViewPerson}
                    sceneStyle={{ paddingTop: 20 }}
                    hideNavBar
                    />
                    <Scene
                        key="messages"
                        component={Messages}
                        title={getOwnUsername}
                    />
                    <Scene
                        key="editUser"
                        component={EditUser}
                        title="Edit User"
                        sceneStyle={{ paddingTop: 20 }}
                    />
                    <Scene
                        key="friends"
                        component={Friends}
                        hideNavBar
                        sceneStyle={{ paddingTop: 14 }}
                    />
                    <Scene
                        key="allPlayers"
                        component={AllPlayers}
                        hideNavBar
                        sceneStyle={{ paddingTop: 14 }}
                    />
                </Scene>
            </Scene>

            <Scene key='play'>
                <Scene
                    key="playHome"
                    component={PlayHome}
                    sceneStyle={{ paddingTop: 20 }}
                    hideNavBar
                />
            </Scene>
        </Router>
    );
};

const styles = {
    navStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    }
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
