import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import _ from 'lodash';

import { Card, CardSection, Input } from './common';

import ListItem from './ListItem';

import {} from '../actions';

class FightRoom extends Component {
    componentWillMount() {
        this.props.friendsFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    onSearchTextChange() {

    }

    createDataSource({ friends }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(friends);
    }

    renderRow(friend) {
        return <ListItem employee={friend} />;
    }

    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Input
                            placeholder="search"
                            onChangeText={this.onSearchTextChange.bind(this)}
                            value={this.props.searchText}
                        />
                    </CardSection>
                </Card>

                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const styles = {
    
};

const mapStateToProps = state => {
    const friends = _.map(state.friends, (val, uid) => {
        return { ...val, uid }; // end obj is { shift: 'Monday', name: 'Sam', id: '1234' }
    });

    return { friends };
};

const componentActions = {
    
};

export default connect(mapStateToProps, componentActions)(FightRoom);
