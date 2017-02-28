import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {  } from '../actions';
import ListOfUsers from './ListOfUsers';

class Dashboaord extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>Dashboard</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { profile } = state.auth;
    return { profile };
};

const componentActions = {

};

export default connect(mapStateToProps, componentActions)(Dashboaord);
