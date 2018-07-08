import React from 'react';
import {Form, Segment, Button, Label, Divider} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import {connect} from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin';

import * as dispatchActions from '../authActions';

const LoginForm = ({login, handleSubmit, error,socialLogin}) => {
    return (
        <Form error size="large" onSubmit={handleSubmit(login)}>
            <Segment>
                <Field
                    name="email"
                    component={TextInput}
                    type="text"
                    placeholder="Email Address"/>
                <Field
                    name="password"
                    component={TextInput}
                    type="password"
                    placeholder="password"/> {error && <Label basic>{error}</Label>}
                <Button fluid size="large" color="teal">
                    Login
                </Button>
                <Divider horizontal>
                    Or
                </Divider>
                <SocialLogin socialLogin={socialLogin}/>
            </Segment>
        </Form>
    );
};

export default connect(null, dispatchActions)(reduxForm({form: 'loginForm'})(LoginForm));