import * as React from 'react';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { RequestDialog } from './request.dialog';
import {Floor, Request} from "../sim.types";

interface RequestBtnProps {
    direction: 'up' | 'down';
    currentFloor: Floor;
}

interface RequestBtnState {
    openDialog: boolean;
    availableFloors: Floor[];
    selectedValue: Request;
}

export class RequestBtn extends React.Component<
    RequestBtnProps,
    RequestBtnState
> {
    constructor(props, state) {
        super(props, state);
        this.state = {
            openDialog: false,
            availableFloors:[],
            selectedValue: {
                from:0,
                to: 0,
                direction: this.props.direction
            }
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    handleClickOpen() {
        this.setState({
            openDialog: true
        })
    }

    handleClose(value) {
        this.setState({
            openDialog: false
        })
    }

    render() {
        return (
            <div style={{
                position: 'relative',
                float: 'left'
            }}>
                <RequestDialog
                    open={this.state.openDialog}
                    currentFloor={this.props.currentFloor}
                    availableFloors={this.state.availableFloors}
                    onClose={this.handleClose}
                    selectedValue={this.state.selectedValue}
                />
                <Button
                    variant={'fab'}
                    style={{
                        fontSize: 10,
                        margin: 5
                    }}
                    onClick={this.handleClickOpen}
                >
                    {this.props.direction === 'up' ? (
                        <ArrowUpward />
                    ) : (
                        <ArrowDownward />
                    )}
                </Button>
            </div>
        );
    }
}
