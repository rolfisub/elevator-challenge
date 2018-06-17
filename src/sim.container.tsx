import * as React from 'react';
import { ConfigElevator, ConfigElevatorState } from './config/config.types';
import { ElevatorBtn } from './components/elevator.btn';
import { connect, Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { RequestBtn } from './components/request.btn';
import { simActionCreators } from './sim.actions';

interface SimContainerProps {
    ConfigElevator?: ConfigElevator;
    createSimulation?: (config: ConfigElevator) => void;
}

export class SimContainer extends React.Component<SimContainerProps> {
    constructor(props) {
        super(props);
        this.createSimulation = this.createSimulation.bind(this);
    }

    componentWillMount() {
        //initial state
        console.log('initial state');
        if (this.props.ConfigElevator) {
            console.log(
                'Creating New Simulation with: ',
                this.props.ConfigElevator
            );
            this.createSimulation(this.props.ConfigElevator);
        }
    }

    createSimulation(config: ConfigElevator) {
        //create elevator instances based on configuration
        if (this.props.createSimulation) {
            this.props.createSimulation(config);
        }
    }

    render() {
        return (
            <div>
                <ElevatorBtn active={true} />
                <ElevatorBtn active={false} />
                <RequestBtn direction={'up'} />
                <RequestBtn direction={'down'} />
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
        createSimulation: (c: ConfigElevator) => {
            dispatch(simActionCreators.create(c));
        },
        ...props
    };
    return redux;
};

const SimContainerConnected = connect(
    mapStateToProps,
    mapDispatchToProps as any
)(SimContainer);

export default SimContainerConnected;
