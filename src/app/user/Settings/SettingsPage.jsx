import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react';
import { Switch,Route,Redirect } from 'react-router-dom'
import SettingsNav from './SettingsNav';
import  BasicsPage  from './BasicPage';
import  AboutPage  from './AboutPage';
import  AccountPage  from './AccountPage';
import PhotoPage from './PhotoPage';


import {updatePassword} from '../../features/auth/authActions';
import { updateProfile } from '../userActions';
import {connect} from 'react-redux';

const actions = {
  updatePassword,
  updateProfile
}

const SettingsPage = ({updatePassword,providerId,user,updateProfile}) => {
  return (
  <Grid>
    <GridColumn width={12}>
    <Switch>
      <Redirect exact from='/settings'to='/settings/basics'/>
      <Route path='/settings/basics' render={()=> <BasicsPage updateProfile={updateProfile} initialValues={user}/>}/>
      <Route path='/settings/about' render={()=> <AboutPage updateProfile={updateProfile} initialValues={user}/>}/>
  <Route path='/settings/account' render={()=> <AccountPage updatePassword={updatePassword} providerId={providerId}/>}/>
      <Route path='/settings/photos' component={PhotoPage}/>

    </Switch>
    </GridColumn>

    <GridColumn width={4}>
    <SettingsNav/>
    </GridColumn>
  </Grid>
  )
}

const mapStateToProps=({firebase})=>{
  return {providerId: firebase.auth.providerData[0].providerId,
  user:firebase.profile}
}

export default connect(mapStateToProps,actions) (SettingsPage);
