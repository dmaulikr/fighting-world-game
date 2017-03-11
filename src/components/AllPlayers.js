import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';

import { onPlayerSearchTextChange } from '../actions';

import { Card } from './common';

import AllPlayersList from './AllPlayersList';
import NavBarWithSearch from './NavBarWithSearch';
import NavBox from './NavBox';

const back = require('../images/back.png');
const friends = require('../images/friends.png');
const request = require('../images/request.png');

class AllPlayers extends Component {
    searchTextChanged(text) {
        this.props.onPlayerSearchTextChange(text);
    }

    renderBottomNav() {
        return (
            <NavBox>
                <TouchableOpacity onPress={() => Actions.pop()} style={styles.navBtnStyle}>
                    <Image source={back} style={{ width: 40, height: 40 }} />
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log('all friends pressed')} style={styles.navBtnStyle}>
                    <Image source={friends} style={{ width: 40, height: 40 }} />
                    <Text>Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log('requests pressed')} style={styles.navBtnStyle}>
                    <Image source={request} style={{ width: 40, height: 40 }} />
                    <Text>Requests</Text>
                </TouchableOpacity>
            </NavBox>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBarWithSearch
                    value={this.props.searchPlayerText}
                    onChangeText={this.searchTextChanged.bind(this)}
                    placeholder='Search Players'
                />
                <ScrollView>
                    <Card>
                        <AllPlayersList />
                    </Card>
                </ScrollView>
                {this.renderBottomNav()}
            </View>
        );
    }
}

const styles = {
    navBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3
    }
};

const mapStateToProps = state => {
    return { searchPlayerText: state.auth.searchPlayerText };
};

export default connect(mapStateToProps, { onPlayerSearchTextChange })(AllPlayers);
