import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View, ListView, TouchableWithoutFeedback, Image } from 'react-native';

import { CardSection, Card } from './common';

import {
    fetchRequestsSent,
    viewPerson
} from '../actions';

class RequestSentList extends Component {
    componentWillMount() {
        this.props.fetchRequestsSent();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ friendsSent }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(friendsSent);
    }

    renderPhoto(personSent) {
        const uri = personSent.photoURL || 'https://placeimg.com/300/300/animals';
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
        const { textStyle, textContainerStyle } = styles;
        return (
            <TouchableWithoutFeedback onPress={() => this.props.viewPerson(person.personId)}>
                <View>
                    <CardSection>
                        {this.renderPhoto(person.personSent)}
                        <View style={textContainerStyle}>
                            <Text style={textStyle}>
                                {person.personSent.personal.username}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        if (this.props.friendsSent.length > 0) {
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
    const friendsSent = _.map(state.auth.friendSent, (personSent, personId) => ({ personId, personSent }));
    return { friendsSent };
};

const componentActions = {
    fetchRequestsSent,
    viewPerson
};

export default connect(mapStateToProps, componentActions)(RequestSentList);
