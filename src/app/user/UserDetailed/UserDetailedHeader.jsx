import React from 'react';
import {Grid, Header, Item, Segment} from 'semantic-ui-react';
import differenceInYears from 'date-fns/difference_in_years'

const UserDetailedHeader = ({profile}) => {
    if(!profile ){
        return (
            <Grid.Column width={16}>
            <Segment>
               <p>No profile information available at this time</p>
            </Segment>
        </Grid.Column>
        )
    }
    let age;
    if ( profile.dateOfBirth) {
        age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
    } else {
        age = 'unknown age'
    }
    return (
        <Grid.Column width={16}>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size="small" src={profile.photoURL || '/assets/user.png'}/>
                        <Item.Content verticalAlign="bottom">
                            <Header as="h1">{profile.displayName || 'No Name supplied'}</Header>
                            <br/>
                            <Header as="h3">{profile.occupation || 'No Occupation supplied'}</Header>
                            <br/>
                            <Header as="h3">{age}, Lives in {profile.city || 'unknown city'}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    );
};

export default UserDetailedHeader;
