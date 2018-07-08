import React, {Component} from 'react'
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {Grid} from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';
import {connect} from 'react-redux';
import * as dispatchActions from '../eventActions';
import LoadingComponent from '../../../layout/LoadingComponent'
class EventDashboard extends Component {

    render() {

        const {events} = this.props;

        if (!isLoaded(events) || isEmpty(events)) {
            return (<LoadingComponent inverted={true}/>);
        }
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList events={events}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity/>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = ({ firestore:{ordered}}) => {
    return {events:ordered.events}
}

export default connect(mapStateToProps, dispatchActions)(firestoreConnect([
    {
        collection: 'events'
    }
])(EventDashboard));