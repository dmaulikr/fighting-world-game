import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class Messages extends Component {

    render() {
        return <Text>Messages...</Text>;
    }
}

const mapStateToProps = state => {
    return {};
};

const componentActions = {

};

export default connect(mapStateToProps, componentActions)(Messages);
