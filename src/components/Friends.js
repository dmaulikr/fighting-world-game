import React from 'react';
import { View } from 'react-native';

import FriendList from './FriendList';
import RequestSentList from './RequestSentList';
import RequestReceivedList from './RequestReceivedList';

export default () => {
    return (
        <View>
            <FriendList />
            <RequestReceivedList />
            <RequestSentList />
        </View>
    );
};
