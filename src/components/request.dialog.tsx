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

    handleClose(data: Request) {
        this.props.onClose(data);
    }

    handleFloorClick(data: Request) {
        this.props.onClose(data);
    }
    render() {
        return (
            <Dialog
                onClose={() => this.handleClose(this.props.selectedValue)}
                open={this.props.open}
            >
                <DialogTitle>Please select floor</DialogTitle>
                <DialogContent>
                    {
                        this.props.availableFloors.map((f:Floor, index)=>{
                            return <div key={index}>{(f._id)}</div>;
                        })
                    }
                </DialogContent>
            </Dialog>
        );
    }
}
