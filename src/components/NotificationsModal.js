import React, { Component } from 'react';
import { View, Modal, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { toggleNotificationsModal } from '../actions';

class NotificationsModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.notificationsVisible}
                transparent
                animationType='slide'
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <Text>Notifications</Text>
                </View>
                <View style={styles.containerStyle}>
                    <TouchableOpacity onPress={() => this.props.toggleNotificationsModal(false)}>
                        <Text style={styles.cancelBtnStyle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    cancelBtnStyle: {
        color: '#fff'
    }
};

const mapStateToProps = state => {
    return { notificationsVisible: state.auth.notificationsVisible };
};

export default connect(mapStateToProps, { toggleNotificationsModal })(NotificationsModal);
