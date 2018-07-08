import React from 'react';
import { GridColumn,Header,MenuItem,Menu , GridRow} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

const SettingsNav = () => {
  return (
      <GridColumn width={4}>
        <Menu vertical>
          <Header icon="user" attached inverted color="grey" content="Profile" />
          <MenuItem as={NavLink} to={'/settings/basics'}>Basics</MenuItem>
          <MenuItem as={NavLink} to={'/settings/about'}>About Me</MenuItem>
          <MenuItem as={NavLink} to={'/settings/photos'}>My Photos</MenuItem>
        </Menu>
        <GridRow />
        <Menu vertical>
          <Header
            icon="settings"
            attached
            inverted
            color="grey"
            content="Account"
          />
          <MenuItem as={NavLink} to={'/settings/account'}>My Account</MenuItem>
        </Menu>
      </GridColumn>
  )
}

export default SettingsNav
