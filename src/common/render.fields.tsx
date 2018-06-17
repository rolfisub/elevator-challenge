import * as React from 'react';
import { TextField } from '@material-ui/core';

export const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}: any) => (
    <div>
        <TextField
            label={label}
            {...input}
            {...custom}
            style={{ margin: 10 }}
        />
        {touched && (error && <label style={{ color: 'red' }}>{error}</label>)}
    </div>
);
