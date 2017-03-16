import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';

import NavBox from './NavBox';
import NotificationsModal from './NotificationsModal';

import { toggleNotificationsModal } from '../actions';

const menu = require('../images/menu.png');
const players = require('../images/players.png');
const notifications = require('../images/notifications.png');

class Messages extends Component {
    renderBottomNav() {
        return (
            <NavBox>
                <TouchableOpacity onPress={() => Actions.allPlayers({ type: 'reset' })} style={styles.navBtnStyle}>
                    <Image source={players} style={{ width: 40, height: 40 }} />
                    <Text>People</Text>
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
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Text>Messages</Text>
                    </View>
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
    return {};
};

const componentActions = {
    toggleNotificationsModal
};

export default connect(mapStateToProps, componentActions)(Messages);
