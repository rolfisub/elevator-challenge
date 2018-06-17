import * as React from 'react';
import { Button } from '@material-ui/core';
import { RoomService, Explicit } from '@material-ui/icons';

interface ElevatorBtnProps {
    active: boolean;
}

export const ElevatorBtn = (props: ElevatorBtnProps) => (
    <Button
        color={props.active ? 'secondary' : 'primary'}
        variant={'contained'}
    >
        {props.active ? <Explicit /> : <RoomService />}
    </Button>
);