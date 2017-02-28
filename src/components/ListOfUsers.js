import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection } from './common';

import { fetchUsernames } from '../actions';

class ListOfUsers extends Component {
    componentDidMount() {
        this.props.fetchUsernames();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ usernames }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(usernames);
    }

    renderRow(user) {
        return (
            <TouchableWithoutFeedback onPress={() => Actions.viewUser({ userToFetch: user.uid, title: user.username })}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {user.username}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        if (this.props.usernames.length) {
            return (
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            );
        }
        return <Text>None Yet :(</Text>;
    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        paddingLeft: 15,
        paddingTop: 3,
        paddingBottom: 3
    }
};

const mapStateToProps = state => {
    const { usernames } = state.auth;
    const users = [];
    if (usernames) {
        for (const k in usernames) {
            users.push({ username: k, uid: usernames[k] });
        }
    }
    
    return { usernames: users };
};

const componentActions = {
    fetchUsernames
};

export default connect(mapStateToProps, componentActions)(ListOfUsers);
