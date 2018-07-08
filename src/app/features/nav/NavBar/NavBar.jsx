import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Menu, Container, Button} from 'semantic-ui-react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SingedInMenu from '../Menus/SingedInMenu';
import * as modalActions from '../../modals/modalActions';
import * as authActions from '../../auth/authActions';
import {withFirebase} from 'react-redux-firebase';

const actions = {
    ...modalActions,
    ...authActions
}
class NavBar extends Component {

    onSignIn = () => {
        this
            .props
            .openModal('LoginModal');

    }

    onRegister = () => {
        this
            .props
            .openModal('RegisterModal');

    }

    onSignOut = () => {
        this
            .props
            .firebase
            .logout();
        this
            .props
            .history
            .push('/');
    }

    render() {
        const {auth, profile} = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty
        return (
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to={'/'} header>
                        Re-Events
                    </Menu.Item>
                    <Menu.Item name='Events' as={NavLink} to={'/events'}/> {authenticated && <Menu.Item name='People' as={NavLink} to={'/people'}/>}
                    {authenticated && <Menu.Item>
                        <Button
                            as={Link}
                            to={'/createEvent'}
                            floated='right'
                            positive
                            inverted
                            content='Create Event'/>
                    </Menu.Item>
}
                    {authenticated
                        ? <SingedInMenu auth={auth} profile={profile} signOut={this.onSignOut}/>
                        : <SignedOutMenu signIn={this.onSignIn} register={this.onRegister}/>}
                </Container>
            </Menu>
        )
    }
}

const mapStateToProps = ({firebase}) => ({auth: firebase.auth, profile: firebase.profile})
export default withRouter(withFirebase(connect(mapStateToProps, actions)(NavBar)))