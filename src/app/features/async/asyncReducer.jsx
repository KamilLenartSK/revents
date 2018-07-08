import {createReducer} from '../../common/utils/createReducerUtil';
import {ASYNC_ACTION_START, ASYNC_ACTION_END, ASYNC_ACTION_ERROR} from './asyncConstants';

const initialState = {
    loading: false
}

export const asyncActionStarted = state => {
    return {
        ...state,
        loading: true
    }
}

export const asyncActionEnded = state => {
    return {
        ...state,
        loading: false
    }
}

export const asyncActionError = state => {
    return {
        ...state,
        loading: false
    }
}

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asyncActionStarted,
    [ASYNC_ACTION_END]: asyncActionEnded,
    [ASYNC_ACTION_ERROR]: asyncActionError
})