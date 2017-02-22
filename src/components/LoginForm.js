import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
    emailTextChanged,
    passwordTextChanged,
    loginOrRegisterUserWithEmail,
    loginWithFacebook,
    newUsernameTextChanged,
    testUsername
} from '../actions';

import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailTextChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordTextChanged(text);
    }

    onEmailLoginOrRegisterPress() {
        const { email, password } = this.props;
        this.props.loginOrRegisterUserWithEmail({ email, password });
    }

    onFacebookLoginPress() {
        this.props.loginWithFacebook();
    }

    renderButtonsOrSpinner() {
        if (this.props.loading) {
            return (
                <CardSection>
                    <Spinner size="large" />
                </CardSection>
            );
        }

        const { regularTextStyle, facebookButtonStyle, facebookButtonTextStyle } = styles;
        const facebokBtnStyles = {
            additionalButtonStyle: facebookButtonStyle,
            additionalTextStyle: facebookButtonTextStyle
        };

        return (
            <View>
                <CardSection>
                    <Button onPress={this.onEmailLoginOrRegisterPress.bind(this)}>
                        Login / Register
                    </Button>   
                </CardSection>

                <CardSection>
                    <TouchableOpacity onPress={() => Actions.forgotPassword()}>
                        <Text>Forgot Password</Text>
                    </TouchableOpacity>   
                </CardSection>

                <Text style={regularTextStyle}>
                    or
                </Text>

                <CardSection>
                    <Button
                        onPress={this.onFacebookLoginPress.bind(this)}
                        additionalStyles={facebokBtnStyles}
                    >
                        Login With Facebook
                    </Button>
                </CardSection>
            </View>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                {this.renderButtonsOrSpinner()}
                
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    regularTextStyle: {
        fontSize: 20,
        alignSelf: 'center'
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        borderColor: 'red',
        borderWidth: 1
    },
    facebookButtonStyle: {
        backgroundColor: '#4267B2',
        borderColor: '#4267B2'
    },
    facebookButtonTextStyle: {
        color: '#fff'
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading, newUsername } = state.auth;
    return { email, password, error, loading, newUsername };
};

const componentActions = {
    emailTextChanged,
    passwordTextChanged,
    loginOrRegisterUserWithEmail,
    loginWithFacebook,
    newUsernameTextChanged,
    testUsername
};

export default connect(mapStateToProps, componentActions)(LoginForm);
