import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { Card, CardSection, Button, Spinner, Input } from './common';

import {
    newUsernameTextChanged,
    createUsernameAndProfileAndLogIn
} from '../actions';

class CreateUsername extends Component {
     onNewUsernameTextChange(text) {
        this.props.newUsernameTextChanged(text);
    }

    onUsernameCreate() {
        if (this.props.usernameTestResult === 'Available') {
            this.props.createUsernameAndProfileAndLogIn(this.props.newUsername);
        }
    }

    renderModalHelperText() {
        const { usernameTestResult } = this.props;
        const { availableTextStyle, notAvailableTextStyle } = styles;
        if (usernameTestResult === 'loading') {
            return <Spinner size='small' />;
        }
        const s = usernameTestResult === 'Available' ? availableTextStyle : notAvailableTextStyle;
        return <Text style={s}>{usernameTestResult}</Text>;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.textStyle}>
                            Looks like you are new, Welcome!
                        </Text>
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>
                            Please create a username
                        </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="new username"
                        onChangeText={this.onNewUsernameTextChange.bind(this)}
                        value={this.props.newUsername}
                    />
                    {this.renderModalHelperText()}
                </CardSection>

                <CardSection>
                    <Button onPress={this.onUsernameCreate.bind(this)}>
                        Create
                    </Button>
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
    availableTextStyle: {
        color: 'green'
    },
    notAvailableTextStyle: {
        color: 'red'
    }
};

const mapStateToProps = state => {
    const { newUsername, usernameTestResult } = state.auth;
    return { newUsername, usernameTestResult };
};

const componentActions = {
    newUsernameTextChanged,
    createUsernameAndProfileAndLogIn
};

export default connect(mapStateToProps, componentActions)(CreateUsername);
