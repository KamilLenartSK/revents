import React from 'react';
import {Modal} from 'semantic-ui-react';

import LoginForm from '../auth/Login/LoginForm';

const LoginModal = ({onClose}) => {

    return (
        <Modal size='mini' open={true} onClose={onClose}>
            <Modal.Header>
                Login to Re-vents
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <LoginForm/>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );

}

export default LoginModal;