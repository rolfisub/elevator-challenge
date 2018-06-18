import * as React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Floor, Request } from '../sim.types';

interface RequestDialogProps {
    open: boolean;
    currentFloor: Floor;
    availableFloors: Floor[];
    onClose: (r: Request) => void;
    selectedValue: Request;
}

export class RequestDialog extends React.Component<RequestDialogProps> {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(data) {
        this.props.onClose(data.target.value);
    }

    handleFloorClick(data) {
        this.props.onClose(data.target.value);
    }
    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                <DialogTitle>Please select floor</DialogTitle>
                <DialogContent>
                    test
                </DialogContent>
            </Dialog>
        );
    }
}
