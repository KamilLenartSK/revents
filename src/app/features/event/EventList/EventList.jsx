import React, {Fragment} from 'react'
import EventListItem from './EventListItem'

const EventList = ({events, onDeleteEvent}) => {
    const eventList =  events ? events.map((event,index) => (<EventListItem
        key={index}
        event={event}
        onDelete={onDeleteEvent}/>))
        : null
    return (
        <Fragment>
            {eventList}
        </Fragment>
    )

}

export default EventList;