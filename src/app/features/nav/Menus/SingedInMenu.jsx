import React from 'react'
import { Menu,Dropdown,Image } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom';

const SingedInMenu = ({signOut,profile,auth}) => {

  const doSignOut= ()=>{
    signOut()
  }
  return (
       <Menu.Item position="right">
         <Image avatar spaced="right" src={profile.photoURL ||'/assets/user.png'} />
         <Dropdown pointing="top left" text={profile.displayName}>
           <Dropdown.Menu>
             <Dropdown.Item text="Create Event" icon="plus" />
             <Dropdown.Item text="My Events" icon="calendar" />
             <Dropdown.Item text="My Network" icon="users" />
             <Dropdown.Item as={NavLink} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
             <Dropdown.Item as={NavLink} to={'/settings/'} text="Settings" icon="settings" />
             <Dropdown.Item onClick={doSignOut} text="Sign Out" icon="power" />
           </Dropdown.Menu>
         </Dropdown>
       </Menu.Item>
  )
}

export default SingedInMenu
