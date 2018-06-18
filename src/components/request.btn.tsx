import * as React from 'react';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { RequestDialog } from './request.dialog';
import { Floor, Request } from '../sim.types';
import { ConfigElevator } from '../config/config.types';

interface RequestBtnProps {
    direction: 'up' | 'down';
    currentFloor: Floor;
    config: ConfigElevator;
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
            availableFloors: [],
            selectedValue: {
                from: 0,
                to: 0,
                direction: this.props.direction
            }
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.getAvailableFloors = this.getAvailableFloors.bind(this);
    }

    getAvailableFloors(): Floor[] {
        const {
            direction,
            currentFloor,
            config: { floors }
        } = this.props;
        const floorCount: number =
            typeof floors === 'string' ? parseInt(floors, 10) - 1 : floors - 1;
        if (direction === 'up') {
            if (currentFloor._id >= floorCount) {
                return [];
            } else {
                const diff = floorCount - currentFloor._id;
                const result: Floor[] = [];
                for (let f: number = 0; f <= diff; f++) {
                    if(currentFloor._id !== currentFloor._id + f) {
                        const floor: Floor = {
                            _id: currentFloor._id + f
                        };
                        result.push(floor);
                    }
                }
                return result.reverse();
            }
        } else {
            if (currentFloor._id === 0) {
                return [];
            } else {
                const result: Floor[] = [];
                for (let f: number = currentFloor._id; f >= 0; f--) {
                    if(currentFloor._id !== f) {
                        const floor: Floor = {
                            _id: f
                        };
                        result.push(floor);
                    }
                }
                return result;
            }
        }
    }

    handleClickOpen() {
        this.setState({
            openDialog: true,
            availableFloors: this.getAvailableFloors()
        });
    }

    handleClose(value) {
        this.setState({
            openDialog: false
        });
        console.log(value);
    }

    render() {
        return (
            <div
                style={{
                    position: 'relative',
                    float: 'left'
                }}
            >
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
