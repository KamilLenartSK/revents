import React from 'react'
import {Segment, Image, Item, Button, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import format from 'date-fns/format'
const imageStyles = {
  filter: 'brightness(30%)'
}
const textStyles = {
  position: 'absolute',
  bottom: '0',
  left: '5%',
  color: 'white',
  height: 'auto',
  width: '100%'

}


const EventDetailedHeader = ({event, isHost, isGoing,goingToEvent,cancelGoingToEvent}) => {
  const attendEvent = evt=>goingToEvent(event);
  const cancelEvent = evt=> cancelGoingToEvent(event)
  let eventDate;
  if (event.date) {
    eventDate = event
      .date
      .toDate();
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{
        padding: '0'
      }}>
        <Image src="/assets/categoryImages/drinks.jpg" fluid style={imageStyles}/>

        <Segment basic style={textStyles}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{
                  color: 'white'
                }}/>
                <p>{format(eventDate, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by
                  <strong>
                    {event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing
              ? (
                <Button onClick={cancelEvent}>Cancel My Place</Button>
              )
              : <Button onClick={attendEvent} color="teal">JOIN THIS EVENT</Button>
}
          </div>

        )}

        {isHost && <Button as={Link} to={`/manage/${event.id}`} color="orange">
          Manage Event
        </Button>}
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailedHeader
