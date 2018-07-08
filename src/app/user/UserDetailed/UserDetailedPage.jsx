import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty} from 'react-redux-firebase';
import {compose} from 'redux'
import UserDetailedSidebar from './UserDetailedSidebar'
import UserDetailedHeader from './UserDetailedHeader'
import UserDetailedDescription from './UserDetailedDescription'
import UserDetailedPhotos from './UserDetailedPhotos'
import UserDetailedEvents from './UserDetailedEvents'
import {userDetailedQuery} from '../userQuerties';
import LoadingComponent from '../../layout/LoadingComponent';
class UserDetailedPage extends Component {

    render() {
        const {profile, photos, auth, match, requesting} = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = Object
            .values(requesting)
            .some(item => item === true);

        if (loading) {
            return <LoadingComponent inverted={true}/>
        }
        return (
            <Grid>
                <UserDetailedHeader profile={profile}/>
                <UserDetailedDescription profile={profile}/>
                <UserDetailedSidebar currentUser ={isCurrentUser}/> {photos && photos.length > 0 && <UserDetailedPhotos photos={photos}/>
}

                <UserDetailedEvents/>
            </Grid>

        );
    }
}

const mapStateToProps = ({
    firebase: {
        profile,
        auth
    },
    firestore: {
        ordered,
        status
    }
}, ownProps) => {
    let userUid = null;
    let user = {};
    if (ownProps.match.params.id === auth.uid) {
        user = profile;
    } else {
        user = !isEmpty(ordered.profile) && ordered.profile[0];
        userUid = ownProps.match.params.id;
    }
    return {requesting: status.requesting, profile: user, auth, photos: ordered.photos, userUid}
}

export default compose(connect(mapStateToProps), firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)))(UserDetailedPage)