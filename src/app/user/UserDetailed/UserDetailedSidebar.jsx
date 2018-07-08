import React from 'react';
import {Link} from 'react-router-dom'
import {Button, GridColumn, Segment} from 'semantic-ui-react';
const UserDetailedSidebar = ({currentUser}) => {
    const renderButton = currentUser
        ? <Button
                as={Link}
                to={'/settings'}
                color={'teal'}
                fluid
                basic
                content="Edit Profile"/>
        : <Button as={Link} to={'/'} color={'blue'} fluid basic content="Follow User"/>;
    return (

        <GridColumn width={4}>
            <Segment>
                {renderButton}
            </Segment>
        </GridColumn>

    )
}

export default UserDetailedSidebar;