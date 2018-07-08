import moment from 'moment';

export const createNewEvent = (user, photoUrl, event) => {
    event.date = moment(event.date).toDate(); //nasically formats the date object into JS standard object
    return {
        ...event,
        hostedBy: user.displayName,
        hostUid: user.uid,
        hostPhotoURL: photoUrl || '/assets/user.png',

        created: Date.now(),
        attendees: {
            [user.uid]: {
                going: true,
                joinDate: Date.now(),
                photoUrl: photoUrl || 'assets/user.png',
                displayName: user.displayName,
                host: true

            }
        }
    }
}

export const objectToArray = obj => {
    if (typeof obj === 'object') {
        return Object
            .entries(obj)
            .map(e => Object.assign(e[1], {id: e[0]}))
    }
}