import React from 'react'
import { MenuItem,Button } from 'semantic-ui-react';
const SignedOutMenu = ({signIn, register}) => {

  const doSignIn= ()=>{
    signIn()
  }

  const doRegister= ()=>{
    register()
  }
  return (
    <MenuItem position='right'>
    <Button onClick={doSignIn} basic inverted content='Login'/>
    <Button onClick={doRegister} basic inverted content='Register'/>
</MenuItem>
  )
}

export default SignedOutMenu
