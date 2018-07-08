import {LOGIN_USER, SIGN_OUT_USER} from './authConstants';
import {createReducer} from '../../common/utils/createReducerUtil';

const initialState = {
    currentUser: {}
};

export const login = (state, payload) => {

    return {
        ...state,
        authenticated: true,
        currentUser: payload.creds.email
    }
}

export const logOut = (state, payload) => {

    return {
        ...state,
        authenticated: false,
        currentUser: {}
    }
}

export default createReducer(initialState, {
    [LOGIN_USER]: login,
    [SIGN_OUT_USER]: logOut
});