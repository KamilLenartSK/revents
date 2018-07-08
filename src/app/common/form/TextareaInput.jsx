import React from 'react'
import {FormField, Label} from 'semantic-ui-react'
const TextareaInput = ({
    input,
    width,
    type,
    rows,
    placeholder,
    meta: {
        touched,
        error
    }
}) => {
    return (
        <FormField error={touched && !!error} width={width}>
            <textarea {...input} rows={rows} placeholder={placeholder} type={type}/> {touched && error && <Label basic color='red'>{error}</Label>}
        </FormField>
    )
}

export default TextareaInput
