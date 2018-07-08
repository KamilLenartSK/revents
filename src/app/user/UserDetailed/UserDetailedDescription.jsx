import React from 'react';
import {
    Grid,
    Header,
    Icon,
    Item,
    List,
    Segment
} from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailedDescription = ({profile}) => {
    if (!profile) {
        return (
            <Grid.Column width={12}>
            <Segment>
                <p>No user profile is available at this time</p>
            </Segment>
        </Grid.Column>
        )
    };

        let createdAt = profile.createdAt
            ? format(profile.createdAt.toDate(), 'D MMM YYYY')
            : null;

        const profileInterests = profile.interests
            ? profile
                .interests
                .map((interest, index) => (
                    <Item key={index}>
                        <Icon name="heart"/>
                        <Item.Content>{interest}</Item.Content>
                    </Item>
                ))
            : <p>No interests</p>
        return (
            <Grid.Column width={12}>
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column width={10}>
                            <Header icon="smile" content="About Display Name"/>
                            <p>
                                I am a:
                                <strong>{profile.occupation || 'tbn'}</strong>
                            </p>
                            <p>
                                Originally from
                                <strong>{profile.origin || 'tbn'}</strong>
                            </p>
                            <p>
                                Member Since:
                                <strong>{createdAt}</strong>
                            </p>
                            <p>{profile.description}</p>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header icon="heart outline" content="Interests"/>

                            <List>
                                {profileInterests}
                            </List>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
        );
 
};

export default UserDetailedDescription;