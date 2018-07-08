import React from 'react';
import {Form, Segment, Button, Label,Divider} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import {connect} from 'react-redux';
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import * as dispatchActions from '../authActions'
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
    displayName: isRequired({message: 'display name is required'}),
    email: isRequired({message: 'Provide a valid email address'}),
    password: composeValidators(isRequired({message: 'Passwrod is requred'}), hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters long'}))()
});

const RegisterForm = ({handleSubmit, registerUser, error, submitting, invalid}) => {
    return (
        <div>
            <Form size="large" onSubmit={handleSubmit(registerUser)}>
                <Segment>
                    <Field
                        name="displayName"
                        type="text"
                        component={TextInput}
                        placeholder="Known As"/>
                    <Field name="email" type="text" component={TextInput} placeholder="Email"/>
                    <Field
                        name="password"
                        type="password"
                        component={TextInput}
                        placeholder="Password"/> 
                        {error && <Label basic>{error}</Label>}
                    <Button disabled={invalid || submitting} fluid size="large" color="teal">
                        Register
                    </Button>

                        <Divider horizontal>
                    Or
                    </Divider>
                    <SocialLogin/>
                
                </Segment>
            </Form>
        </div>
    );
};

export default connect(null, dispatchActions)(reduxForm({form: 'registerForm', validate})(RegisterForm));