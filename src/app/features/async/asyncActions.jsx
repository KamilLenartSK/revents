import {ASYNC_ACTION_START, ASYNC_ACTION_END, ASYNC_ACTION_ERROR} from './asyncConstants';

export const asyncActionStart = () => {
    return {type: ASYNC_ACTION_START}
}

export const asyncActionEnd = () => {
    return {type: ASYNC_ACTION_END}
}

export const asyncActionError = () => {
    return {type: ASYNC_ACTION_ERROR}
}