import React from 'react';
import { View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button, Input } from './common';

import { emailTextChangedDeleteAcc, passwordTextChangedDeleteAcc } from '../actions';

const DeleteAccountModal = props => {
    const { visible, onAccept, onDecline, providerData, onDelete } = props;
    const { containerStyle, cardSectionStyle } = styles;

    const onEmailTextChange = text => {
        props.emailTextChangedDeleteAcc(text);
    };

    const onPasswordTextChange = text => {
        props.passwordTextChangedDeleteAcc(text);
    };

    let acceptButtonTitle = 'Yes';
    let declineButtonTitle = 'No';
    if (props.acceptButtonTitle) {
        acceptButtonTitle = props.acceptButtonTitle;
    }
    if (props.declineButtonTitle) {
        declineButtonTitle = props.declineButtonTitle;
    }
    if (providerData === 'facebook.com') {
        return (
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={containerStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'red' }]}>
                            Delete Account
                        </Text>
                    </CardSection>

                    <CardSection>
                    <Button onPress={onAccept}>{acceptButtonTitle}</Button>
                    <Button onPress={onDecline}>{declineButtonTitle}</Button>
                    </CardSection>
                </View>
            </Modal>
        );
    }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
            <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'red' }]}>
                Delete Account
            </Text>
        </CardSection>

        <CardSection style={cardSectionStyle}>
            <Text style={styles.textStyle}>
                Please enter your email and password
            </Text>
        </CardSection>

        <CardSection style={cardSectionStyle}>
            <Input
                placeholder="email"
                onChangeText={onEmailTextChange.bind(this)}
                value={props.newUsername}
            />
        </CardSection>

        <CardSection style={cardSectionStyle}>
            <Input
                secureTextEntry
                placeholder="password"
                onChangeText={onPasswordTextChange.bind(this)}
                value={props.newUsername}
            />
        </CardSection>

        <CardSection>
          <Button onPress={onDelete}>{acceptButtonTitle}</Button>
          <Button onPress={onDecline}>{declineButtonTitle}</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center',
        flex: 1
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        flex: 1
    }
};

const mapStateToProps = state => {
    const { emailDeleteAcc, passwordDeleteAcc } = state.auth;
    return { emailDeleteAcc, passwordDeleteAcc };
};

const componentActions = {
    emailTextChangedDeleteAcc,
    passwordTextChangedDeleteAcc
};

export default connect(mapStateToProps, componentActions)(DeleteAccountModal);
