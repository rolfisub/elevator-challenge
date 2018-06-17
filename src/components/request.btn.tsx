import * as React from 'react';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { Button } from '@material-ui/core';

interface RequestBtnProps {
    direction: 'up' | 'down';
}

export const RequestBtn = (props: RequestBtnProps) => (
    <Button variant={'fab'}>
        {props.direction === 'up' ? <ArrowUpward /> : <ArrowDownward />}
    </Button>
);
