import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FriendList from './FriendList';
import RequestSentList from './RequestSentList';
import RequestReceivedList from './RequestReceivedList';
import NavBarWithSearch from './NavBarWithSearch';
import NavBox from './NavBox';

import {
    emptyPeople,
    onFriendSearchTextChange
} from '../actions';

const back = require('../images/back.png');
const friends = require('../images/friends.png');
const request = require('../images/request.png');

class Friends extends Component {
    componentWillMount() {
        this.props.emptyPeople();
    }

    searchTextChanged(text) {
        this.props.onFriendSearchTextChange(text);
    }

    renderBottomNav() {
        return (
            <NavBox>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.navBtnStyle}>
                    <Image source={back} style={{ width: 40, height: 40 }} />
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log('all friends pressed')} style={styles.navBtnStyle}>
                    <Image source={friends} style={{ width: 40, height: 40 }} />
                    <Text>Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log('requests pressed')} style={styles.navBtnStyle}>
                    <Image source={request} style={{ width: 40, height: 40 }} />
                    <Text>Requests</Text>
                </TouchableOpacity>
            </NavBox>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBarWithSearch
                    value={this.props.searchFriendText}
                    onChangeText={this.searchTextChanged.bind(this)}
                    placeholder='Search Friends'
                />
                <ScrollView>
                    <FriendList />
                    <RequestReceivedList />
                    <RequestSentList />
                </ScrollView>
                {this.renderBottomNav()}
            </View>
        );
    }
}

const styles = {
    navBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3
    }
};

const mapStateToProps = state => {
    return { searchFriendText: state.auth.searchFriendText };
};

export default connect(mapStateToProps, { emptyPeople, onFriendSearchTextChange })(Friends);
