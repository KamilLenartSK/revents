import React from 'react'
import {ListItem, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const EventListAtendee = ({attendee}) => {
    console.log(attendee);
    return (
        <ListItem>
            <Image
                as={Link}
                to={`/profile/${attendee.id}`}
                size='mini'
                circular
                src={attendee.photoUrl} />
        </ListItem>
    )

}

export default EventListAtendee;
