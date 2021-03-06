import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Card, CardSection, Button } from './common';

import NavBox from './NavBox';

import {
    signOut,
    fetchProfile
} from '../actions';

const friends = require('../images/friends.png');
const messages = require('../images/messages.png');

const notifications = require('../images/notifications.png');
const menu = require('../images/menu.png');
const battle = require('../images/battle.png');

class User extends Component {

    componentDidMount() {
        this.props.fetchProfile();
    }

    signOutButtonPress() {
        this.props.signOut();
    }

    renderPhoto() {
        let { photoURL } = this.props.profile;
        if (!photoURL) {
            photoURL = 'https://placeimg.com/300/300/animals';
        }
        return (
            <CardSection>
                <View style={styles.imageContainerStyle}>
                    <Image
                        source={{ uri: photoURL }}
                        style={styles.imageStyle}
                    />
                </View>
            </CardSection>
        );
    }

    renderUsername() {
        const { username } = this.props.profile.personal;
        if (username) {
            return (
                <CardSection>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.textStyle}>
                            {username}
                        </Text>
                    </View>
                </CardSection>
            );
        }
    }

    renderButtons() {
        const { navBtnStyle } = styles;
        const { username } = this.props.profile.personal;
        return (
            <CardSection>
                <View style={[styles.textContainerStyle, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                    <TouchableOpacity onPress={() => Actions.friends({ title: username })} style={navBtnStyle}>
                        <Image source={friends} style={{ width: 40, height: 40 }} />
                        <Text>Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Actions.messages()} style={navBtnStyle}>
                        <Image source={messages} style={{ width: 40, height: 40 }} />
                        <Text>Messages</Text>
                    </TouchableOpacity>
                </View>
            </CardSection>
        );
    }

    renderName() {
        const { displayName } = this.props.profile.personal;
        if (displayName) {
            return (
                <CardSection>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.textStyle}>
                            {displayName}
                        </Text>
                    </View>
                </CardSection>
            );
        }
    }

    renderEmail() {
        const { email } = this.props.profile.personal;
        if (email) {
            return (
                <CardSection>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.textStyle}>
                            {email}
                        </Text>
                    </View>
                </CardSection>
            );
        }
    }

    renderStats() {
        const { disconnects, wins, losses, draws } = this.props.profile.stats;
        return (
            <CardSection>
                <View style={[styles.textContainerStyle, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                    <Text style={styles.textStyle}>
                        <Text style={{ fontWeight: 'bold', color: 'green' }}>W:</Text> {wins}
                    </Text>
                    <Text style={styles.textStyle}>
                        <Text style={{ fontWeight: 'bold', color: 'orange' }}>D:</Text> {draws}
                    </Text>
                    <Text style={styles.textStyle}>
                        <Text style={{ fontWeight: 'bold', color: 'red' }}>L:</Text> {losses}
                    </Text>
                    <Text style={styles.textStyle}>
                        <Text style={{ fontWeight: 'bold', color: 'blue' }}>DNF:</Text> {disconnects}
                    </Text>
                </View>
            </CardSection>
        );
    }

    renderSignOutButton() {
        const { signOutButtonStyle, signOutButtonTextStyle } = styles;
        const signOutBtnStyles = {
            additionalButtonStyle: signOutButtonStyle,
            additionalTextStyle: signOutButtonTextStyle
        };

        return (
            <Button
                onPress={this.signOutButtonPress.bind(this)}
                additionalStyles={signOutBtnStyles}
            >
                Sign Out
            </Button>
        );
    }

    renderBottomNav() {
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
        if (this.props.profile && this.props.user) {
            return (
                <View style={{ flex: 1 }}>
            <ScrollView>
                <Card>
                    {this.renderPhoto()}

                    {this.renderUsername()}

                    {this.renderButtons()}
                
                    {this.renderName()}

                    {this.renderEmail()}

                    {this.renderStats()}
                    
                    <CardSection>
                        {this.renderSignOutButton()}
                    </CardSection>
                </Card>
            </ScrollView>
            <View>
                {this.renderBottomNav()}
            </View>
        </View>
            );
        }
        return (
            <Card>
                <CardSection>
                    <Text>Loading...</Text>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column'
    },
    imageStyle: {
        height: 300,
        width: 300,
        alignSelf: 'center',
        borderRadius: 4
    },
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column'
    },
    signOutButtonStyle: {
        borderColor: '#FF0000'
    },
    signOutButtonTextStyle: {
        color: '#FF0000'
    },
    navBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3
    }
};

const mapStateToProps = state => {
    const { user, profile } = state.auth;
    return { user, profile };
};

const componentActions = {
    signOut,
    fetchProfile
};

export default connect(mapStateToProps, componentActions)(User);
