import * as React from 'react';
import {ConfigElevator} from "../forms/config.types";
import {ElevatorBtn} from "./elevator.btn";

interface SimContainerProps {
    ConfigElevator: ConfigElevator;
}

export class SimContainer extends React.Component<SimContainerProps> {

    render() {
        return( 
            <div>
                <ElevatorBtn active={true}/>
                <ElevatorBtn active={false}/>
            </div>
        );
    }
}
