import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Card, CardSection, } from './common';

import {
    sendFriendRequest,
    approveFriendRequest,
    rejectFriend
} from '../actions';

class ViewPerson extends Component {

    componentDidMount() {

    }

    renderPhoto() {
        let { photoURL } = this.props.personToView;
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
        const { personToView, relationship } = this.props;
        let icon = (
            <TouchableOpacity onPress={() => this.props.sendFriendRequest(personToView)}>
                <Text style={[textStyle, plusStyle]}>Add To Friends?</Text>
            </TouchableOpacity>
        );
        if (relationship === 'friends') {
            icon = (
                <TouchableOpacity onPress={() => this.props.rejectFriend(personToView)}>
                    <Text style={[textStyle, minusStyle]}>Delete Friend?</Text>
                </TouchableOpacity>
            );
        }
        if (relationship === 'reqReceived') {
            icon = (
                <TouchableOpacity onPress={() => this.props.rejectFriend(personToView)}>
                    <Text style={[textStyle, delReqStyle]}>Delete Request?</Text>
                </TouchableOpacity>
            );
        }
        if (relationship === 'reqSent') {
            icon = (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.approveFriendRequest(personToView)}>
                        <Text style={[textStyle, plusStyle, { marginRight: 4 }]}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.rejectFriend(personToView)}>
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
                        <Text style={[textStyle, { fontWeight: 'bold', color: '#191970' }]}>Message</Text>
                    </TouchableOpacity>
                </View>
            </CardSection>
        );
    }

    renderName() {
        const { displayName } = this.props.personToView.personal;
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
        const { email } = this.props.personToView.personal;
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
        const { disconnects, wins, losses, draws } = this.props.personToView.stats;
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
        if (this.props.personToView && this.props.relationship) {
            console.log(this.props.relationship)
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
    const { personToView, user } = state.auth;
    if (personToView) {
        for (const x in personToView.people) {
            if (x === user.uid) {
                return { personToView, relationship: personToView.people[x] };
            }
        }
    }
    return { personToView, relationship: 'notFriends' };
};

const componentActions = {
    sendFriendRequest,
    approveFriendRequest,
    rejectFriend
};

export default connect(mapStateToProps, componentActions)(ViewPerson);
