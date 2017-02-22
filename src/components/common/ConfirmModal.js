import React from 'react';
import { View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ConfirmModal = props => {
    const { children, visible, onAccept, onDecline } = props;
    const { containerStyle, cardSectionStyle } = styles;

    let acceptButtonTitle = 'Yes';
    let declineButtonTitle = 'No';
    if (props.acceptButtonTitle) {
        acceptButtonTitle = props.acceptButtonTitle;
    }
    if (props.declineButtonTitle) {
        declineButtonTitle = props.declineButtonTitle;
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
          {children}
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
    justifyContent: 'center'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { ConfirmModal };
