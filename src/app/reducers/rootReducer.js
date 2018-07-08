import {combineReducers  } from 'redux';
import modalReducer from '../features/modals/modalReducer'
import eventReducer from '../features/event/eventReducer';
import authReducer from '../features/auth/authReducer';
import asyncReducer from '../features/async/asyncReducer';
import {reducer as formReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
const rootReducer = combineReducers({
 events: eventReducer,
 form: formReducer,
 modals: modalReducer,
 auth:authReducer,
 async:asyncReducer,
 toastr:toastrReducer,
 firebase:firebaseReducer,
 firestore:firestoreReducer
});

export default rootReducer;