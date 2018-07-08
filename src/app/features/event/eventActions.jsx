import {CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS} from './eventConstants';
import {asyncActionStart, asyncActionEnd, asyncActionError} from '../async/asyncActions';
import {fetchSampleData} from '../../data/mockApi';
import {createNewEvent} from '../../common/utils/helpers'
import {toastr} from 'react-redux-toastr';
import moment from 'moment';
export const fetchEvents = events => {
    return {type: FETCH_EVENTS, payload: events}
}
export const createEvent = event => {
    return async(dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        const user = firebase
            .auth()
            .currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        let newEvent = createNewEvent(user, photoURL, event);

        try {
            let createdEvent = await firestore.add('events', newEvent);
            await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
                eventId: createdEvent.id,
                userId: user.uid,
                eventDate: event.date,
                host: true
            })
            toastr.success('Success!', 'Event has been created')
        } catch (error) {
            toastr.error('Error', `error ${error}`)
        }
    }
}

export const cancelToggle = (cancelled, eventId) => async(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const message = cancelled
        ? 'Are you sure you wish to cancel the event?'
        : 'This will cancel the event- are you sure ?';
    const successMessgae = cancelled
        ? 'event has been cancelled'
        : 'event has been reactivated';
    try {
        toastr.confirm(message, {
            onOk: () => {
                firestore.update(`events/${eventId}`, {cancelled: cancelled})
                toastr.success('Success', successMessgae)
            }
        })

    } catch (error) {
        console.log(error);
    }
}

export const updateEvent = event => async(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
        event.date = moment(event.date).toDate();
    }

    try {
        await firestore.update(`events/${event.id}`, event)
        toastr.success('Success!', 'Event has been updated')
    } catch (error) {
        toastr.error('Error', `error ${error}`)
    }
}

export const deleteEvent = eventId => {
    return {type: DELETE_EVENT, payload: {
            eventId
        }}
}

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart());
            let events = await fetchSampleData();

            dispatch(fetchEvents(events));
            dispatch(asyncActionEnd());
        } catch (error) {
            dispatch(asyncActionError());

        }
    }
}