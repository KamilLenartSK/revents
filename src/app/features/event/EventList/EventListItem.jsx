import React from 'react';
import {Link} from 'react-router-dom';
import format from 'date-fns/format'
import {objectToArray} from '../../../common/utils/helpers'

import {
    Button,
    SegmentGroup,
    Segment,
    ItemGroup,
    Item,
    ItemImage,
    ItemContent,
    ItemHeader,
    ItemDescription,
    Icon,
    List,
    Label
} from 'semantic-ui-react';
import EventListAtendee from './EventListAtendee';
const EventListItem = ({event}) => {

 

    const attendees = event.attendees
        ? objectToArray(event.attendees).map((attendee, index) => (<EventListAtendee key={index} attendee={attendee}/>))
        : <div>Loading...</div>;
    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        <ItemImage size='tiny' circular src={event.hostPhotoURL}/>
                        <ItemContent>
                            <ItemHeader as={Link} to={`/event/${event.id}`}>
                                {event.title}</ItemHeader>
                            <ItemDescription>
                                Hosted by
                                <Link to={`profile/${event.hostUid}`}>{event.hostedBy}</Link>
                            </ItemDescription>
                            {event.cancelled && <Label
                                ribbon={'right'}
                                color={'red'}
                                content={'This event has been cancelled'}/>}
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(event.date.toDate(), 'dddd Do MMMM')}
                    at {format(event.date.toDate(), 'HH:mm')}
                    |
                    <Icon name='marker'/> {event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>{attendees}</List>
            </Segment>
            <Segment clearing>
                <span>{event.description}</span>
                <Button
                    as={Link}
                    to={`/event/${event.id}`}
                    color='teal'
                    floated='right'
                    content='View'/>
             
            </Segment>
        </SegmentGroup>
    )

}

export default EventListItem;
