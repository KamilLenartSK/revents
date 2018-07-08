import React from 'react'
import { Link } from 'react-router-dom'
import {Segment, List, Label, Item} from 'semantic-ui-react';
const EventDetailedSidebar = ({attendees}) => {
  console.log(attendees);
  const isHost = false;
  const attendeeList = attendees
    ? attendees.map(attendee => {
      return <Item key={attendee.id} style={{
        position: 'relative'
      }}>{isHost && <Label
          style={{
          position: 'absolute'
        }}
          color="orange"
          ribbon="right">
          Host
        </Label>
}

        <Item.Image size="tiny" src={attendee.photoUrl}/>
        <Item.Content verticalAlign="middle">
          <Item.Header as="h3">
            <Link to={`/profile/${attendee.id}`}>{attendee.displayName}</Link>
          </Item.Header>
        </Item.Content>
      </Item>
    })
    : null;

  return (
    <div>
      <Segment
        textAlign="center"
        style={{
        border: 'none'
      }}
        attached="top"
        secondary
        inverted
        color="teal">
        2 People Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendeeList}</List>
      </Segment>
    </div>
  )
}

export default EventDetailedSidebar
