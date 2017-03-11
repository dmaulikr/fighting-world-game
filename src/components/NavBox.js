import React from 'react';
import { View } from 'react-native';

const NavBox = props => (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );

const styles = {
    containerStyle: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'relative'
    }
};

export default NavBox;
