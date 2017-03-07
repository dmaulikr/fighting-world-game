import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View, ListView, TouchableWithoutFeedback, Image } from 'react-native';

import { CardSection, Card } from './common';

import {
    fetchFriends,
    viewPerson
} from '../actions';

class FriendList extends Component {
    componentWillMount() {
        this.props.fetchFriends();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ friends }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(friends);
    }

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

    renderRow(person) {
        const { friend, friendId } = person;
        const { textStyle, textContainerStyle } = styles;
        return (
            <TouchableWithoutFeedback onPress={() => this.props.viewPerson(friendId)}>
                <View>
                    <CardSection>
                        {this.renderPhoto(friend.photoURL)}
                        <View style={textContainerStyle}>
                            <Text style={textStyle}>
                                {friend.personal.username}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        if (this.props.friends.length > 0) {
            return (
                <View>
                    <Text style={styles.headerStyle}>Friends</Text>
                    <Card>
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </Card>
                </View>
            );
        }
        return (
            <View>
                <Text style={styles.textStyle}>{''}</Text>
            </View>
        );
    }
}

const styles = {
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
        height: 70,
        width: 70,
        alignSelf: 'flex-start',
        borderRadius: 4
    },
    imageContainerStyle: {
        flexDirection: 'column'
    }
};

const mapStateToProps = state => {
    const friends = _.map(state.auth.friends, (friend, friendId) => ({ friendId, friend }));
    return { friends };
};

const componentActions = {
    fetchFriends,
    viewPerson
};

export default connect(mapStateToProps, componentActions)(FriendList);
