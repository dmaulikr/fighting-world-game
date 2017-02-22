import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { fetchProfile } from '../actions';

class Dashboaord extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }

    render() {
        if (!this.props.profile) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>
                Welcome {this.props.profile ? this.props.profile.personal.username : 'Loading...'}!
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { profile } = state.auth;
    return { profile };
};

const componentActions = {
    fetchProfile
};

export default connect(mapStateToProps, componentActions)(Dashboaord);
