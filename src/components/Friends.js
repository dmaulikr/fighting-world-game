import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import FriendList from './FriendList';
import RequestSentList from './RequestSentList';
import RequestReceivedList from './RequestReceivedList';

import {
    emptyPeople
} from '../actions';

class Friends extends Component {
    componentWillMount() {
        this.props.emptyPeople();
    }
    
    render() {
        return (
            <View>
                <FriendList />
                <RequestReceivedList />
                <RequestSentList />
            </View>
        );
    }
}

export default connect(null, { emptyPeople })(Friends);
