import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import User from './components/User';
import EditUser from './components/EditUser';
import CreateUsername from './components/CreateUsername';
import ForgotPassword from './components/ForgotPassword';

import { deleteWithoutReauthentication } from './actions';

const RouterComponent = (props) => {
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
                    onRight={() => Actions.user()}
                    rightTitle="User"
                    key="dashboard"
                    component={Dashboard}
                    title="Dashboard"
                    initial
                />
                <Scene
                    onRight={() => Actions.editUser()}
                    rightTitle="Edit"
                    key="user"
                    component={User}
                    title="User"
                />
                <Scene
                    key="editUser"
                    component={EditUser}
                    title="Edit User"
                />
            </Scene>
        </Router>
    );
};

export default connect(null, { deleteWithoutReauthentication })(RouterComponent);
