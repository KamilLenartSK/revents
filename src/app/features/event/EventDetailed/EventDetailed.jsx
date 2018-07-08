import React, {Component} from 'react'
import {withFirestore} from 'react-redux-firebase';

import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import {Grid, GridColumn} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {objectToArray} from '../../../common/utils/helpers';
import * as dispatchActions from '../../../user/userActions';
class EventDetailed extends Component {

  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }
  render() {
    const {event, auth, goingToEvent, cancelGoingToEvent} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(attendee => attendee.id === auth.uid)
    return (

      <Grid>
        <GridColumn width={10}>
          <EventDetailedHeader
            isGoing={isGoing}
            isHost={isHost}
            event={event}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat/>
        </GridColumn>
        <GridColumn width={6}>
          <EventDetailedSidebar attendees={attendees}/>
        </GridColumn>
      </Grid>

    )
  }
}

const mapStateToProps = ({
  firestore: {
    ordered
  },
  firebase: {
    auth
  }
},) => {

  let event = {};
  if (ordered && ordered.events) {
    event = ordered.events[0]
  }

  return {event, auth}
}

export default withFirestore(connect(mapStateToProps, dispatchActions)(EventDetailed));
