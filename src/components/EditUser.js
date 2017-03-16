import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';

import { Card, CardSection, Button, Spinner, Input, ConfirmModal } from './common';

import EmailChangeModal from './EmailChangeModal';
import DeleteAccountModal from './DeleteAccountModal';
import NavBox from './NavBox';
import NotificationsModal from './NotificationsModal';

import {
    usernameTextChanged,
    nameTextChanged,
    fetchUserInfo,
    editEmailTextChanged,
    fetchUserPersonalInfo,
    fetchProfile,
    newUsernameTextChanged,
    deleteUser,
    getProvider,
    reauthenticateWithFaceAndDelete,
    reauthenticateWithEmailAndDelete,
    reauthenticateWithEmailAndUpdateEmail,
    updateName,
    updateUsername,
    chooseAndUploadImage,
    toggleNotificationsModal
} from '../actions';

const menu = require('../images/menu.png');
const battle = require('../images/battle.png');
const notifications = require('../images/notifications.png');

class EditUser extends Component {
    state = {
        showEditUsernameScreen: false,
        showEditEmailScreen: false,
        showEditNameScreen: false,
        showDeleteAccountScreen: false,
        showUploadPhotoOptions: false
    }

    componentWillMount() {
        this.props.fetchProfile();
        const { editEmail } = this.props.user;
        this.props.editEmailTextChanged(editEmail);
        this.props.getProvider();
    }

    componentWillUpdate() {
        this.props.getProvider();
    }

    onNameChange(text) {
        this.props.nameTextChanged(text);
    }

    onNameChangeAccept() {
        this.props.updateName(this.props.displayName);
        this.setState({ showEditNameScreen: false });
    }

    onUsernameChangeAccept() {
        const { usernameTestResult, newUsername } = this.props;
        if (usernameTestResult === 'Available') {
            this.props.updateUsername(newUsername);
            this.setState({ showEditUsernameScreen: false });
        }
    }

    onNewUsernameTextChange(text) {
        this.props.newUsernameTextChanged(text);
    }

    onEmailChangeAccept() {
        const { oldEmailChangeEmail, newEmailChangeEmail, passwordChangeEmail } = this.props;
        this.props.reauthenticateWithEmailAndUpdateEmail(
            oldEmailChangeEmail,
            newEmailChangeEmail,
            passwordChangeEmail
        );
        this.setState({ showEditEmailScreen: false });
    }

    onAccountDeleteAccept() {
        this.props.reauthenticateWithFaceAndDelete();
    }

    onDeleteWithEmail() {
        const { emailDeleteAcc, passwordDeleteAcc } = this.props;
        this.props.reauthenticateWithEmailAndDelete(emailDeleteAcc, passwordDeleteAcc);
    }

    uploadPhotoPressed() {
        this.setState({ showUploadPhotoOptions: true });
    }

    chooseFromLibraryAndUpload() {
        ImagePicker.openPicker({
            width: 350,
            height: 350,
            cropping: true
        })
        .then(image => {
            this.props.chooseAndUploadImage(image);
        })
        .catch(error => console.log(error));
    }

    takeNewPhotoAndUpload() {
        ImagePicker.openCamera({
            width: 350,
            height: 350,
            cropping: true
        })
        .then(image => {
            this.props.chooseAndUploadImage(image);
        })
        .catch(error => console.log(error));
    }

    renderPhoto() {
        let { photoURL } = this.props.user;
        if (!photoURL) {
            photoURL = 'https://placeimg.com/300/300/animals';
        }
        return (
            <View style={styles.imageContainerStyle}>
                <Image
                    source={{ uri: photoURL }}
                    style={styles.imageStyle}
                />
            </View>
        );
    }

    renderName() {
        if (this.props.profile) {
            return (
                <View style={styles.textContainerStyle}>
                    <TouchableOpacity onPress={() => this.setState({ showEditNameScreen: true })}>
                        <Text style={styles.textStyle}>
                            {this.props.profile.personal.displayName || 'no name yet'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderUsername() {
        if (this.props.profile) {
            return (
                <View style={styles.textContainerStyle}>
                    <TouchableOpacity onPress={() => this.setState({ showEditUsernameScreen: true })}>
                        <Text style={styles.textStyle}>
                            {this.props.profile.personal.username ? this.props.profile.personal.username : 'no username yet'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderEmailSection() {
        if (this.props.user) {
            return (
                <View style={styles.textContainerStyle}>
                    <TouchableOpacity onPress={() => this.setState({ showEditEmailScreen: true })}>
                        <Text style={styles.textStyle}>
                            {this.props.user.email ? this.props.user.email : 'no email yet'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderUploadButton() {
        const { uploadPhotoButtonStyle, uploadPhotoTextStyle, buttonContainerStyle, smallBtnStyle } = styles;
        const uploadBtnStyles = {
            additionalButtonStyle: uploadPhotoButtonStyle,
            additionalTextStyle: uploadPhotoTextStyle
        };

        if (this.props.loadingPhoto) {
            return <Spinner size='large' />;
        }

        if (!this.state.showUploadPhotoOptions) {
            return (
                <Button
                    onPress={this.uploadPhotoPressed.bind(this)}
                    additionalStyles={uploadBtnStyles}
                >
                    Upload a Photo
                </Button>
            );
        }

        return (
            <View style={buttonContainerStyle}>
                <TouchableOpacity
                    onPress={this.chooseFromLibraryAndUpload.bind(this)}
                    style={smallBtnStyle}
                >
                    <Text style={{ fontSize: 17, color: '#191970' }}>From Library</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.takeNewPhotoAndUpload.bind(this)}
                    additionalStyles={uploadBtnStyles}
                    style={smallBtnStyle}
                >
                    <Text style={{ fontSize: 17, color: '#191970' }}>New Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.setState({ showUploadPhotoOptions: false })}
                    additionalStyles={uploadBtnStyles}
                    style={smallBtnStyle}
                >
                    <Text style={{ fontSize: 17, color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderDeleteAccountButton() {
        const { deleteButtonStyle, deleteButtonTextStyle } = styles;
        const deleteBtnStyles = {
            additionalButtonStyle: deleteButtonStyle,
            additionalTextStyle: deleteButtonTextStyle
        };

        return (
            <Button
                onPress={() => this.setState({ showDeleteAccountScreen: true })}
                additionalStyles={deleteBtnStyles}
            >
                Delete Account
            </Button>
        );
    }

    renderModalHelperText() {
        const { usernameTestResult } = this.props;
        const { availableTextStyle, notAvailableTextStyle } = styles;
        if (usernameTestResult === 'loading') {
            return <Spinner size='small' />;
        }
        const s = usernameTestResult === 'Available' ? availableTextStyle : notAvailableTextStyle;
        return <Text style={s}>{usernameTestResult}</Text>;
    }

    renderBottomNav() {
        return (
            <NavBox>
                <TouchableOpacity onPress={() => Actions.play({ type: 'reset' })} style={styles.navBtnStyle}>
                    <Image source={battle} style={{ width: 40, height: 40 }} />
                    <Text>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.toggleNotificationsModal(true)} style={styles.navBtnStyle}>
                    <Image source={notifications} style={{ width: 40, height: 40 }} />
                    <Text>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.refresh({ key: 'drawer', open: value => !value })} style={styles.navBtnStyle}>
                    <Image source={menu} style={{ width: 40, height: 40 }} />
                    <Text>Menu</Text>
                </TouchableOpacity>
            </NavBox>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Card>
                        <CardSection>
                            {this.renderPhoto()}
                        </CardSection>

                        <CardSection>
                            {this.renderUploadButton()}
                        </CardSection>
                    </Card>

                    <Card>
                        <CardSection>
                            {this.renderUsername()}
                        </CardSection>
                        <CardSection>
                            {this.renderName()}
                        </CardSection>
                        <CardSection>
                            {this.renderEmailSection()}
                        </CardSection>
                    </Card>

                    <Card>
                        <CardSection>
                            {this.renderDeleteAccountButton()}
                        </CardSection>
                    </Card>
                </ScrollView>

                <View>
                    {this.renderBottomNav()}
                </View>

                <NotificationsModal />

                <ConfirmModal
                    visible={this.state.showEditNameScreen}
                    onAccept={this.onNameChangeAccept.bind(this)}
                    onDecline={() => this.setState({ showEditNameScreen: false })}
                    acceptButtonTitle={'Save'}
                    declineButtonTitle={'Cancel'}
                >
                    <Input
                        placeholder="new name"
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.props.displayName}
                    />
                </ConfirmModal>

                <ConfirmModal
                    visible={this.state.showEditUsernameScreen}
                    onAccept={this.onUsernameChangeAccept.bind(this)}
                    onDecline={() => this.setState({ showEditUsernameScreen: false })}
                    acceptButtonTitle={'Save'}
                    declineButtonTitle={'Cancel'}
                >
                    <Input
                        placeholder="new username"
                        onChangeText={this.onNewUsernameTextChange.bind(this)}
                        value={this.props.newUsername}
                    />
                    {this.renderModalHelperText()}
                </ConfirmModal>

                <EmailChangeModal
                    visible={this.state.showEditEmailScreen}
                    onAccept={this.onEmailChangeAccept.bind(this)}
                    onDecline={() => this.setState({ showEditEmailScreen: false })}
                    acceptButtonTitle={'Save'}
                    declineButtonTitle={'Cancel'}
                    providerData={this.props.providerData}
                />

                <DeleteAccountModal
                    credential={this.props.credential}
                    providerData={this.props.providerData}
                    visible={this.state.showDeleteAccountScreen}
                    onAccept={this.onAccountDeleteAccept.bind(this)}
                    onDelete={this.onDeleteWithEmail.bind(this)}
                    onDecline={() => this.setState({ showDeleteAccountScreen: false })}
                    acceptButtonTitle={'Delete'}
                    declineButtonTitle={'Cancel'}
                />
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        paddingTop: 5,
        paddingBottom: 5
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column'
    },
    availableTextStyle: {
        color: 'green'
    },
    notAvailableTextStyle: {
        color: 'red'
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
    uploadPhotoButtonStyle: {
        borderColor: '#000000'
    },
    uploadPhotoTextStyle: {
        color: '#000000'
    },
    deleteButtonStyle: {
        borderColor: '#FF0000',
        backgroundColor: '#FF0000'
    },
    deleteButtonTextStyle: {
        color: '#FFF'
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    smallBtnStyle: {
        alignSelf: 'center',
        paddingBottom: 8,
        paddingTop: 8
    },
    navBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3
    }
};

const mapStateToProps = state => {
    const {
        user,
        loading,
        editEmail,
        displayName,
        profile,
        usernameTestResult,
        providerData,
        emailDeleteAcc,
        passwordDeleteAcc,
        oldEmailChangeEmail,
        newEmailChangeEmail,
        passwordChangeEmail,
        newUsername,
        loadingPhoto
    } = state.auth;

    return {
        user,
        loading,
        editEmail,
        displayName,
        profile,
        usernameTestResult,
        providerData,
        emailDeleteAcc,
        passwordDeleteAcc,
        oldEmailChangeEmail,
        newEmailChangeEmail,
        passwordChangeEmail,
        newUsername,
        loadingPhoto
    };
};

const componentActions = {
    updateName,
    usernameTextChanged,
    nameTextChanged,
    fetchUserInfo,
    editEmailTextChanged,
    fetchUserPersonalInfo,
    fetchProfile,
    newUsernameTextChanged,
    deleteUser,
    getProvider,
    reauthenticateWithFaceAndDelete,
    reauthenticateWithEmailAndDelete,
    reauthenticateWithEmailAndUpdateEmail,
    updateUsername,
    chooseAndUploadImage,
    toggleNotificationsModal
};

export default connect(mapStateToProps, componentActions)(EditUser);
