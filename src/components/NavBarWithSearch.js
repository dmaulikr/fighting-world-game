import React from 'react';
import { Image, View } from 'react-native';

import { Card, CardSection, Input } from './common';

const search = require('../images/search.png');

const NavBarWithSearch = ({ onChangeText, value, placeholder }) => {
    const { iconWrapperStyle, iconStyle } = styles;
    return (
        <Card>
            <CardSection>
                <View style={iconWrapperStyle}>
                    <Image source={search} style={iconStyle} />
                </View>
                <Input
                    placeholder={placeholder || 'Enter Text'}
                    onChangeText={onChangeText}
                    value={value}
                />
            </CardSection>
        </Card>
    );
};

const styles = {
    iconWrapperStyle: {
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        width: 20,
        height: 20
    }
};

export default NavBarWithSearch;
