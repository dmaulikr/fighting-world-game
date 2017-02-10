import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import {
    emailTextChanged,
    passwordTextChanged,
    loginOrRegisterUserWithEmail,
    loginWithFacebook
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
        if (this.props.loading) return (
            <CardSection>
                <Spinner size="large" />
            </CardSection>
        );

        const { regularTextStyle, facebookButtonStyle, facebookButtonTextStyle} = styles;
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
    facebookButtonStyle: {
        backgroundColor: '#4267B2',
        borderColor: '#4267B2'
    },
    facebookButtonTextStyle: {
        color: '#fff'
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;
    return { email, password, error, loading };
};

const componentActions = {
    emailTextChanged,
    passwordTextChanged,
    loginOrRegisterUserWithEmail,
    loginWithFacebook
};

export default connect(mapStateToProps, componentActions)(LoginForm);
