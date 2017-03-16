import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { CardSection } from './common';

import { fetchProfile, signOut } from '../actions';

const players = require('../images/players.png');
const friends = require('../images/friends.png');
const battle = require('../images/battle.png');
const messages = require('../images/messages.png');
const signOutImage = require('../images/signOut.png');
const settings = require('../images/settings.png');
const home = require('../images/home.png');

class SideMenu extends Component {
    renderPhoto(photoURL) {
        const uri = photoURL || 'https://placeimg.com/300/300/animals';
        return (
            <View style={styles.imageContainerStyle}>
                <Image
                    source={{ uri }}
                    style={styles.imageStyle}
                />
            </View>
        );
    }

    render() {
        if (!this.props.profile) return <Text style={styles.textStyle}>{''}</Text>;
        return (
            <View style={styles.sideMenuStyle}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.user({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                {this.renderPhoto(this.props.profile.photoURL)}
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        {this.props.profile.personal.username}
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.dashboard({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={home}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        Home
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.play({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={battle}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        Play
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.allPlayers({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={players}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        People
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.friends({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={friends}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        Friends
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.messages({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={messages}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        Messages
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.editUser({ type: 'reset' });
                            Actions.refresh({ key: 'drawer', open: value => !value });
                        }}
                    >
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={settings}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        Settings
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.props.signOut()}>
                        <View>
                            <CardSection>
                                <View style={styles.imageContainerStyle}>
                                    <Image
                                        source={signOutImage}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.textContainerStyle}>
                                    <Text style={styles.textStyle}>
                                        Sign Out
                                    </Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>
                    
            </View>
        );
    }
}

const styles = {
    sideMenuStyle: {
        marginTop: 20,
        marginLeft: 2,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    headerStyle: {
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 3
    },
    textStyle: {
        fontSize: 20,
    },
    textContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    imageStyle: {
        height: 50,
        width: 50,
        alignSelf: 'flex-start',
        borderRadius: 4
    },
    imageContainerStyle: {
        flexDirection: 'column'
    }
};

const mapStateToProps = state => {
    const { profile } = state.auth;
    return { profile };
};

export default connect(mapStateToProps, { fetchProfile, signOut })(SideMenu);
