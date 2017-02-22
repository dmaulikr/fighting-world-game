import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { Card, CardSection, Button, Spinner, Input } from './common';

import {
    passwordResetTextChanged,
    recoverAccountTapped
} from '../actions';

class ForgotPassword extends Component {

     onForgotPasswordTextChange(text) {
        this.props.passwordResetTextChanged(text);
    }

    onSendPassword() {
        this.props.recoverAccountTapped(this.props.passwordResetText);
    }

    renderButtonOrSpinner() {
        if (this.props.loading) {
            return (
                <Spinner size="large" />
            );
        }
        return (
            <Button onPress={this.onSendPassword.bind(this)}>
                Send Password
            </Button>
        );
    }

    renderMessages() {
        const { success, passwordResetError } = this.props;
        const { errorTextStyle, successTextStyle } = styles;
        if (success) {
            return <Text style={successTextStyle}>{success}</Text>;
        }
        if (passwordResetError) {
            return <Text style={errorTextStyle}>{passwordResetError}</Text>;
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.textStyle}>
                            Please enter your email
                        </Text>
                    </View>
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="your@email.com"
                        onChangeText={this.onForgotPasswordTextChange.bind(this)}
                        value={this.props.passwordResetText}
                    />
                </CardSection>

                {this.renderMessages()}
                
                <CardSection>
                    {this.renderButtonOrSpinner()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    successTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'green'
    },
};

const mapStateToProps = state => {
    const { passwordResetText, loading, passwordResetError, success } = state.auth;
    return { passwordResetText, loading, passwordResetError, success };
};

const componentActions = {
    passwordResetTextChanged,
    recoverAccountTapped
};

export default connect(mapStateToProps, componentActions)(ForgotPassword);
