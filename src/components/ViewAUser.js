import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Card, CardSection, } from './common';

import {
    fetchProfile,
    sendFriendRequest,
    setRequestIcon,
    approveFriendRequest,
    rejectFriend
} from '../actions';

class ViewAUser extends Component {

    componentDidMount() {
        this.props.fetchProfile(this.props.userToFetch);
        this.props.setRequestIcon(this.props.userToFetch);
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

    renderButtons() {
        const { textStyle, plusStyle, minusStyle, delReqStyle } = styles;
        const { userToFetch, areFriends } = this.props;
        let icon = (
            <TouchableOpacity onPress={() => this.props.rejectFriend(userToFetch)}>
                <Text style={[textStyle, minusStyle]}>Delete Friend?</Text>
            </TouchableOpacity>
        );
        if (areFriends === 'notFriends') {
            icon = (
                <TouchableOpacity onPress={() => this.props.sendFriendRequest(userToFetch)}>
                    <Text style={[textStyle, plusStyle]}>Add To Friends?</Text>
                </TouchableOpacity>
            );
        }
        if (areFriends === 'reqReceived') {
            icon = (
                <TouchableOpacity onPress={() => this.props.rejectFriend(userToFetch)}>
                    <Text style={[textStyle, delReqStyle]}>Delete Request?</Text>
                </TouchableOpacity>
            );
        }
        if (areFriends === 'reqSent') {
            icon = (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.approveFriendRequest(userToFetch)}>
                        <Text style={[textStyle, plusStyle, { marginRight: 4 }]}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.rejectFriend(userToFetch)}>
                        <Text style={[textStyle, minusStyle, { marginLeft: 4 }]}>Reject</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <CardSection>
                <View style={[styles.textContainerStyle, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                   {icon}

                    <TouchableOpacity onPress={() => console.log('messages')}>
                        <Text style={[textStyle, { fontWeight: 'bold', color: '#191970' }]}>Messages</Text>
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

    render() {
        if (this.props.profile && this.props.areFriends) {
            return (
                <Card>   
                    {this.renderPhoto()}

                    {this.renderButtons()}
                
                    {this.renderName()}

                    {this.renderEmail()}

                    {this.renderStats()}
                </Card>
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
    plusStyle: {
        fontWeight: 'bold',
        color: '#4678C0'
    },
    minusStyle: {
        fontWeight: 'bold',
        color: '#FE6347'
    },
    delReqStyle: {
        fontWeight: 'bold',
        color: 'orange'
    },
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
    }
};

const mapStateToProps = state => {
    const { profile, areFriends } = state.auth;
    return { profile, areFriends };
};

const componentActions = {
    fetchProfile,
    sendFriendRequest,
    approveFriendRequest,
    setRequestIcon,
    rejectFriend
};

export default connect(mapStateToProps, componentActions)(ViewAUser);
