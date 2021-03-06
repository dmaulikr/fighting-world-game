import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';

import { Card, CardSection } from './common';

import NavBox from './NavBox';
import NotificationsModal from './NotificationsModal';

import { fetchProfile, toggleNotificationsModal } from '../actions';

const notifications = require('../images/notifications.png');
const menu = require('../images/menu.png');
const battle = require('../images/battle.png');

class Dashboaord extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }

    renderBottomNav() {
        const { username } = this.props.profile.personal;
        return (
            <NavBox>
                <TouchableOpacity onPress={() => Actions.play({ type: 'reset' })} style={styles.navBtnStyle}>
                    <Image source={battle} style={{ width: 40, height: 40 }} />
                    <Text>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.toggleNotificationsModal(true)} style={styles.navBtnStyle}>
                    <Image source={notifications} style={{ width: 40, height: 40 }} />
                    <Text>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.refresh({ key: 'drawer', open: value => !value })} style={styles.navBtnStyle}>
                    <Image source={menu} style={{ width: 40, height: 40 }} />
                    <Text>Menu</Text>
                </TouchableOpacity>
            </NavBox>
        );
    }

    render() {
        if (!this.props.profile) return <Text>Loading...</Text>;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Card>
                        <CardSection>
                            <Text>Dashboard things</Text>
                        </CardSection>
                    </Card>
                </ScrollView>
                <View>
                    {this.renderBottomNav()}
                </View>
                <NotificationsModal />
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
    const { profile } = state.auth;
    return { profile };
};

const componentActions = {
    fetchProfile,
    toggleNotificationsModal
};

export default connect(mapStateToProps, componentActions)(Dashboaord);
