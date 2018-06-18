import * as React from 'react';
import { Request } from '../sim.types';
import { Button } from '@material-ui/core';

interface FloorBtnProps {
    request: Request;
    onClick: (r: Request) => void;
}

export const FloorBtn = (props: FloorBtnProps) => (
    <Button variant={'fab'} onClick={() => props.onClick(props.request)}>
        {props.request.to + 1}
    </Button>
);
