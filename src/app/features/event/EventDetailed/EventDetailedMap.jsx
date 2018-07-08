import React from 'react'
import GoogleMapReact from 'google-map-react';
import {Segment, Icon} from 'semantic-ui-react';

const Marker = () =>{
    return(
        <Icon name={'marker'} size={'big'} color={'red'}></Icon>
    )
}

const EventDetailedMap = ({lat, lng}) => {
    const center = [lat, lng];
    const zoom = 14;
    const API = 'AIzaSyDezHf25HzfNBgXXaYXpEw2ISsqDkd6Zfo';

    return (
        <Segment attached='bottom' style={{padding:'0'}}>
            <div
                style={{
                height: '20vh',
                width: '100%'
            }}>
                <GoogleMapReact
                    bootstrapURL={{
                    key: API
                }}
                    defaultCenter={center}
                    defaultZoom={zoom}>
                    <Marker lat={lat} lng={lng}/>
                    </GoogleMapReact>
            </div>
        </Segment>
    )
}
export default EventDetailedMap;