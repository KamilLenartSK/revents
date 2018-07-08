import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Container} from 'semantic-ui-react';
import NavBar from '../../app/features/nav/NavBar/NavBar'
import ModalManager from '../features/modals/modalManager';

const Loading = ({error, pastDelay}) => {
  if (error) {
    console.log(error);
    return `error has occured! ${error}` ;
  } else if (pastDelay) {
    return 'taking longer than expected...';
  } else {
    return <h3>Loading...</h3>;
  }
};

const HomePage = Loadable({
  loader: () => import ('../features/home/HomePage'),
  loading: Loading
});

const PeopleDashboard = Loadable({
  loader: () => import ('../user/PeopleDashboard/PeopleDashboard'),
  loading: Loading
});
const UserDetailed = Loadable({
  loader: () => import ('../user/UserDetailed/UserDetailedPage'),
  loading: Loading
});
const SettingsPage = Loadable({
  loader: () => import ('../user/Settings/SettingsPage'),
  loading: Loading
});

const EventForm = Loadable({
  loader: () => import ('../features/event/EventForm/EventForm'),
  loading: Loading
});

const EventDashboard = Loadable({
  loader: () => import ('../features/event/EventDashboard/EventDashboard'),
  loading: Loading
});

const EventDetailed = Loadable({
  loader: () => import ('../features/event/EventDetailed/EventDetailed'),
  loading: Loading
});

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>
        <Route
          path={'/(.+)'}
          render={() => (
          <Fragment>
            <NavBar/>
            <Container className='main'>
              <Switch>
                <Route path='/event/:id' component={EventDetailed}/>
                <Route path='/events' component={EventDashboard}/>
                <Route path='/people' component={PeopleDashboard}/>
                <Route path='/profile/:id' component={UserDetailed}/>
                <Route path='/settings' component={SettingsPage}/>
                <Route path='/createEvent' component={EventForm}/>
                <Route path='/manage/:id' component={EventForm}/>
              </Switch>
            </Container>
          </Fragment>
        )}/>

      </Fragment>

    );
  }
}

export default App;
