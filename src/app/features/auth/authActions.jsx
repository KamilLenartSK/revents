import {SubmissionError, reset} from 'redux-form';
import {toastr} from 'react-redux-toastr';
import {closeModal} from '../modals/modalActions'
export const login = creds => {
    return async(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {

            throw new SubmissionError({_error: error.message})
        }

    }

}

export const registerUser = user => async(dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        // create user in firebase auth
        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password);
        // update auth profile

        await createdUser.updateProfile({displayName: user.displayName});

        let newUser = {
            displayName: user.displayName,
            createdAt: firestore
                .FieldValue
                .serverTimestamp()
        }

        await firestore.set(`users/${createdUser.uid}`, {
            ...newUser
        });

        dispatch(closeModal());
    } catch (error) {
        throw new SubmissionError({_error: error.message});
    }
}

export const socialLogin = socialProvider => async(dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
        dispatch(closeModal());
        let user = await firebase.login({provider: socialProvider, type: 'popup'})
        if (user.additionalUserInfo.isNewUser) {
            await firestore.set(`users/${user.user.uid}`, {
                displayName: user.profile.displayName,
                photoURL: user.profile.avatarUrl,
                createdAt: firestore
                    .FieldValue
                    .serverTimestamp()
            })
        }
    } catch (error) {}

}

export const updatePassword = credentials => async(dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase
        .auth()
        .currentUser;
    try {
        await user.updatePassword(credentials.newPassword1);
        await dispatch(reset('account'));
        toastr.success('Success', 'Your password has been updated')

    } catch (error) {
        throw new SubmissionError({_error: error.message})
    }
}
