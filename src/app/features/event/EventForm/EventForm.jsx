/* global google*/
import React, {Component} from 'react'
import {
    Segment,
    Button,
    Form,
    Grid,
    GridColumn,
    Header
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withFirestore, firestoreConnect} from 'react-redux-firebase';
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import {Field, reduxForm} from 'redux-form'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import * as dispatchActions from '../eventActions'
import TextInput from '../../../common/form/TextInput';
import TextareaInput from '../../../common/form/TextareaInput';
import SelectInput from '../../../common/form/SelectInput';
import DateInput from '../../../common/form/DateInput.jsx';
import PlaceInput from '../../../common/form/PlacesInput';
import withExternalLib from '../../../common/utils/scriptLoad';

const category = [
    {
        key: 'drinks',
        text: 'Drinks',
        value: 'drinks'
    }, {
        key: 'culture',
        text: 'Culture',
        value: 'culture'
    }, {
        key: 'film',
        text: 'Film',
        value: 'film'
    }, {
        key: 'food',
        text: 'Food',
        value: 'food'
    }, {
        key: 'music',
        text: 'Music',
        value: 'music'
    }, {
        key: 'travel',
        text: 'Travel',
        value: 'travel'
    }
];
const validate = combineValidators({
    title: isRequired({message: 'event title is required'}),
    category: isRequired({message: 'Please select appropriate category for the event'}),
    description: composeValidators(isRequired({message: 'Please provide description of the event'}), hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters long'}))(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('Date is required')
});

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: Object.assign({}, this.props.event),
            selectedCityCoords: {},
            selectedVenueCoords: {}
        }
    }
    async componentDidMount() {
        const {firestore, match} = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    async componentWillUnmount() {
        const {firestore, match} = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }

    onClickHandleCancel = event => {
        this
            .props
            .history
            .push('/events')
    }
    onPlaceSelect = place => {

        geocodeByAddress(place)
            .then(results => getLatLng(results[0]))
            .then(latLong => this.setState({selectedCityCoords: latLong}))
            .then(() => this.props.change('city', place))

    }

    onVenueSelect = venue => {

        geocodeByAddress(venue)
            .then(results => getLatLng(results[0]))
            .then(latLong => this.setState({selectedVenueCoords: latLong}))
            .then(() => this.props.change('venue', venue))

    }

    onFormSubmit = values => {

        values.venueLatLng = this.state.selectedVenueCoords;
        if (this.props.initialValues.id) {
            if (Object.keys(values.venueLatLng).length === 0) {
                values.venueLatLng = this.props.event.venueLatLng;
            }
            this
                .props
                .updateEvent(values);
            console.log(values);
            this
                .props
                .history
                .goBack();
        } else {

            this
                .props
                .createEvent(values);
            this
                .props
                .history
                .push('/events');
        }

    }

    render() {
        const {submitting, invalid, pristine, event, cancelToggle} = this.props;
        return (
            <Grid>
                <GridColumn>
                    <Segment>
                        <Form
                            onSubmit={this
                            .props
                            .handleSubmit(this.onFormSubmit)}>
                            <Header color='teal' sub content={'Event Description'}/>
                            <Field
                                name={'title'}
                                type={'text'}
                                component={TextInput}
                                placeholder={'Event Name'}/>

                            <Field
                                name={'category'}
                                type={'text'}
                                component={SelectInput}
                                options={category}
                                placeholder={'What is Your event all about ?'}/>

                            <Field
                                name={'description'}
                                type={'text'}
                                component={TextareaInput}
                                placeholder={'Tell us more about the event'}/>
                            <Header color='teal' sub content={'Event Location'}/>
                            <Field
                                name={'city'}
                                type={'text'}
                                component={PlaceInput}
                                onSelect={this.onPlaceSelect}
                                options={{
                                types: ['(cities)']
                            }}
                                placeholder={' Which city does your event take place in ?'}/> {this.props.scriptLoaded && <Field
                                name={'venue'}
                                type={'text'}
                                component={PlaceInput}
                                options={{
                                location: new google
                                    .maps
                                    .LatLng(this.state.selectedCityCoords),
                                radius: 1000,
                                types: ['establishment']
                            }}
                                onSelect={this.onVenueSelect}
                                placeholder={'Where it is ?'}/>
}
                            <Field
                                name="date"
                                type="text"
                                component={DateInput}
                                dateFormat="DD-MM-YYYY HH:mm"
                                timeFormat="HH:mm"
                                showTimeSelect
                                placeholder="Date and time of event"/>

                            <Button disabled={invalid || submitting || pristine} positive type='submit'>
                                Submit</Button>
                            <Button type='button' onClick={this.onClickHandleCancel}>
                                Cancel</Button>
                            <Button
                                type='button'
                                onClick={() => cancelToggle(!event.cancelled, event.id)}
                                color={event.cancelled
                                ? 'green'
                                : 'red'}
                                floated={'right'}
                                content={event.cancelled
                                ? 'Reactivate Event'
                                : 'Cancel Event'}/>

                        </Form>
                    </Segment>
                </GridColumn>

            </Grid>

        )
    }
}
const mapStateToProps = ({
    firestore: {
        ordered
    }
}, ownProps) => {

    let event = {};
    if (ordered.events && ordered.events[0]) {
        event = ordered.events[0];
    }
    return {initialValues: event, event};

}
export default withFirestore(connect(mapStateToProps, dispatchActions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(withExternalLib(EventForm))));

// export default connect(mapStateToProps, dispatchActions)(firestoreConnect([
//   {         collection: 'events'     } ])(reduxForm({form: 'eventForm',
// enableReinitialize: true, validate})(withExternalLib(EventForm))));