import * as React from 'react';
import { ConfigElevator, ConfigElevatorState } from '../forms/config.types';
import { ElevatorBtn } from './elevator.btn';
import { connect, Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import {RequestBtn} from "./request.btn";

interface SimContainerProps {
    ConfigElevator?: ConfigElevator;
}

export class SimContainer extends React.Component<SimContainerProps> {

    componentWillMount() {
        //create elevator instances based on configuration
        console.log(this.props.ConfigElevator);
    }

    render() {
        return (
            <div>
                <ElevatorBtn active={true} />
                <ElevatorBtn active={false} />
                <RequestBtn direction={'up'}/>
                <RequestBtn direction={'down'}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any, props: any): SimContainerProps => {
    const redux: SimContainerProps = {
        ConfigElevator: state.reducers.ConfigElevator.current,
        ...props
    };
    return redux;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ThunkAction<void, ConfigElevatorState, void> | any>,
    props: SimContainerProps
) => {
    const redux: SimContainerProps = {
        ...props
    };
    return redux;
};

const SimContainerConnected = connect(
    mapStateToProps,
    mapDispatchToProps as any
)(SimContainer);

export default SimContainerConnected;
