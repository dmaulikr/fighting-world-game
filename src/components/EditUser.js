import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { Card, CardSection, Button, Spinner, Input, ConfirmModal } from './common';

import EmailChangeModal from './EmailChangeModal';
import DeleteAccountModal from './DeleteAccountModal';

import {
    updateUserProfile,
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
    chooseAndUploadImage
} from '../actions';

class EditUser extends Component {
    state = {
        showEditUsernameScreen: false,
        showEditEmailScreen: false,
        showDeleteAccountScreen: false,
        showUploadPhotoOptions: false
    }

    componentDidMount() {
        this.props.fetchProfile();
        const { displayName, editEmail } = this.props.user;
        this.props.nameTextChanged(displayName);
        this.props.editEmailTextChanged(editEmail);
        this.props.getProvider();
    }

    onNameChange(text) {
        this.props.nameTextChanged(text);
    }

    onUsernameChangeAccept() {
        const { usernameTestResult, newUsername } = this.props;
        if (usernameTestResult === 'Available') {
            this.props.updateUsername(newUsername);
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

    saveChangesPressed() {
        const { displayName } = this.props;
        this.props.updateUserProfile(this.props.user, displayName);
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

    renderSaveButton() {
        if (this.props.loading) {
            return (
                <Spinner size="large" />
            );
        }
        return (
            <Button onPress={this.saveChangesPressed.bind(this)}>
                Save Changes
            </Button>
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

    render() {
        return (
            <View>
            <ScrollView>
                <Card>
                    <CardSection>
                        {this.renderPhoto()}
                    </CardSection>

                    <CardSection>
                        {this.renderUploadButton()}
                    </CardSection>

                    <CardSection>
                        <Input
                            placeholder="John Smith"
                            onChangeText={this.onNameChange.bind(this)}
                            value={this.props.displayName}
                        />
                    </CardSection>

                    <CardSection>
                        {this.renderSaveButton()}
                    </CardSection>
                </Card>

                <Card>
                    <CardSection>
                        {this.renderUsername()}
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
    updateUserProfile,
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
    chooseAndUploadImage
};

export default connect(mapStateToProps, componentActions)(EditUser);
