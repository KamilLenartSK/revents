import React from 'react';
import{Button,Icon} from 'semantic-ui-react';


const SocialLogin = ({socialLogin})=>{
const loginInit = provider=> () =>{
    socialLogin(provider)
}    
    return (
        <div>
            <Button onClick={loginInit('facebook')} type='button' style={{marginBottom:'10px'}} fluid color={'facebook'}>
                <Icon name={'facebook'}/> Login with Facebook
            </Button>

                      <Button onClick={loginInit('google')} type='button' style={{marginBottom:'10px'}} fluid color={'google plus'}>
                <Icon name={'google plus'}/> Login with Google
            </Button>
        </div>
    )
}


export default SocialLogin