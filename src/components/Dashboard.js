import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

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
