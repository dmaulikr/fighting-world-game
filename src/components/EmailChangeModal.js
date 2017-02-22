import React from 'react';
import { View, Modal } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Button, Input } from './common';

import {
  oldEmailTextChangedChangeEmail,
  newEmailTextChangedChangeEmail,
  passwordTextChangedChangeEmail,
  reauthenticateWithFaceAndUpdateEmail
} from '../actions';

const EmailChangeModal = props => {
    const { visible, onAccept, onDecline, providerData, newEmailChangeEmail } = props;
    const { containerStyle, cardSectionStyle } = styles;

    const onPasswordTextChange = text => {
		props.passwordTextChangedChangeEmail(text);
    };

    const onOldEmailTextChange = text => {
		props.oldEmailTextChangedChangeEmail(text);
    };

	const onNewEmailTextChange = text => {
		props.newEmailTextChangedChangeEmail(text);
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
					<Input
						placeholder="new email"
						onChangeText={onNewEmailTextChange.bind(this)}
						value={newEmailChangeEmail}
					/>
				</CardSection>

				<CardSection>
				<Button onPress={() => props.reauthenticateWithFaceAndUpdateEmail(newEmailChangeEmail)}>
          {acceptButtonTitle}
        </Button>
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
            <Input
                secureTextEntry
                placeholder="password"
                onChangeText={onPasswordTextChange.bind(this)}
                value={props.passwordChangeEmail}
            />
        </CardSection>

        <CardSection style={cardSectionStyle}>
            <Input
                placeholder="old email"
                onChangeText={onOldEmailTextChange.bind(this)}
                value={props.oldEmailChangeEmail}
            />
        </CardSection>

        <CardSection style={cardSectionStyle}>
            <Input
                placeholder="new email"
                onChangeText={onNewEmailTextChange.bind(this)}
                value={props.newEmailChangeEmail}
            />
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>{acceptButtonTitle}</Button>
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
  }
};

const mapStateToProps = state => {
	const {
		oldEmailChangeEmail,
		newEmailChangeEmail,
		passwordChangeEmail,
	} = state.auth;

	return {
		oldEmailChangeEmail,
		newEmailChangeEmail,
		passwordChangeEmail,
	};
};

const componentActions = {
  oldEmailTextChangedChangeEmail,
  newEmailTextChangedChangeEmail,
  passwordTextChangedChangeEmail,
  reauthenticateWithFaceAndUpdateEmail
};

export default connect(mapStateToProps, componentActions)(EmailChangeModal);
