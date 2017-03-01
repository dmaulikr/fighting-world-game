import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ListView, TouchableWithoutFeedback, Image } from 'react-native';

import { CardSection, Card } from './common';

import {
    fetchRequestsSent
} from '../actions';

class RequestSentList extends Component {
    componentDidMount() {
        this.props.fetchRequestsSent();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ friendSent }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(friendSent);
    }

    renderPhoto(person) {
        const photoURL = person.photoURL ? person.photoURL : 'https://placeimg.com/300/300/animals';
        return (
            <View style={styles.imageContainerStyle}>
                <Image
                    source={{ uri: photoURL }}
                    style={styles.imageStyle}
                />
            </View>
        );
    }

    renderRow(person) {
        const { textStyle, textContainerStyle } = styles;
        return (
            <TouchableWithoutFeedback onPress={() => console.log(person)}>
                <View>
                    <CardSection>
                        {this.renderPhoto(person)}
                        <View style={textContainerStyle}>
                            <Text style={textStyle}>
                                {person.personal.username}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const x = '';
        if (this.props.friendSent.length > 0) {
            return (
                <View>
                    <Text style={styles.headerStyle}>Requests Sent</Text>
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
                <Text style={styles.textStyle}>{x}</Text>
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
    return { friendSent: state.auth.friendSent };
};

const componentActions = {
    fetchRequestsSent
};

export default connect(mapStateToProps, componentActions)(RequestSentList);