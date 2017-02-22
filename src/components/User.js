import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View } from 'react-native';
import { Card, CardSection, Button } from './common';

import {
    signOut,
    fetchProfile
} from '../actions';

class User extends Component {

    componentDidMount() {
        this.props.fetchProfile();
    }

    signOutButtonPress() {
        this.props.signOut();
    }

    renderUsername() {
        const { username } = this.props.profile.personal;
        if (username) {
            return (
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>
                    {username}
                </Text>
            );
        }
    }

    renderPhoto() {
        let { photoURL } = this.props.user;
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

    renderName() {
        const { displayName } = this.props.user;
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
        const { email } = this.props.user;
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

    render() {
        if (this.props.profile && this.props.user) {
            return (
                <Card>
                    <View>
                        {this.renderUsername()}
                    </View>
                    
                    {this.renderPhoto()}
                
                    {this.renderName()}

                    {this.renderEmail()}
                    
                    <CardSection>
                        {this.renderSignOutButton()}
                    </CardSection>
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
    const { user, profile } = state.auth;
    return { user, profile };
};

const componentActions = {
    signOut,
    fetchProfile
};

export default connect(mapStateToProps, componentActions)(User);
