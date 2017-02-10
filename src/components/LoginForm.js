import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

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

    renderButtonOrSpinner() {
        if (this.props.loading) return <Spinner size="large" />;

        return (
            <Button onPress={this.onEmailLoginOrRegisterPress.bind(this)}>
                Login / Register
            </Button>
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

                <CardSection>
                    {this.renderButtonOrSpinner()}
                </CardSection>

                <Text style={styles.regularTextStyle}>
                    or
                </Text>

                <CardSection>
                    <Button onPress={this.onFacebookLoginPress.bind(this)}>
                        Login With Facebook
                    </Button>
                </CardSection>
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
