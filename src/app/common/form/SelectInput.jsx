import React from 'react'
import {FormField, Select, Label} from 'semantic-ui-react';

const SelectInput = ({
    input,
    width,
    type,
    placeholder,
    multiple,
    options,
    meta: {
        touched,
        error
    }
}) => {
    return (
        <FormField>
            <Select
                value={input.value || null}
                multiple={multiple}
                options={options}
                onChange={(evt, data) => input.onChange(data.value)}
                placeholder={placeholder}/> {touched && error && <Label basic color='red'>{error}</Label>}
        </FormField>
    )
}

export default SelectInput
