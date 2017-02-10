import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, additionalStyles }) => {
  const { buttonStyle, textStyle } = styles;

  let additionalButtonStyle = {};
  let additionalTextStyle = {};
  if (additionalStyles) {
    if (additionalStyles.additionalButtonStyle) {
      additionalButtonStyle = additionalStyles.additionalButtonStyle;
    }
    if (additionalStyles.additionalTextStyle) {
      additionalTextStyle = additionalStyles.additionalTextStyle;
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, additionalButtonStyle]}>
      <Text style={[textStyle, additionalTextStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
