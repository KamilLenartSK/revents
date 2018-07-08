import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import firebase from '../config/firebase';

const reactReduxFirebaseConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
}

export const configStore = () => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})]; // insert any middlewares here
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer]; // applied to store
    const composeEnhancer = composeWithDevTools(...storeEnhancer, reactReduxFirebase(firebase, reactReduxFirebaseConfig), reduxFirestore(firebase)); //connected to redux
    const store = createStore(rootReducer, composeEnhancer); //store created

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module
                .hot
                .accept('../reducers/rootReducer', () => {
                    const newRootReducer = require('../reducers/rootReducer').default;
                    store.replaceReducer(newRootReducer);
                })
        }
    }
    return store;
}