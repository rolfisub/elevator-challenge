import { ActionTypes, Model, StoreState } from './common/redux.common';
import { ConfigElevatorState } from './config/config.types';

export interface Request {
    from: number;
    to: number;
    direction: 'up' | 'down';
}

export interface Floor extends Model {}

export interface Elevator extends Model {
    currentFloor: number;
    direction: 'up' | 'down' | 'none';
    requests: Request[];
    trips: number;
    maintenance: boolean;
}

export interface Simulation extends Model {
    elevators: Elevator[];
    floors: Floor[];
}

export interface SimState extends StoreState<Simulation> {}

class ActionTypesSim extends ActionTypes {
    public assignRequest: string;
    constructor(public module: string) {
        super(module);
        this.assignRequest = this.module + '.assignRequest';
    }
}

export const SimActionTypes: ActionTypesSim = new ActionTypesSim('Sim');

export interface SimulationState {
    reducers: {
        ConfigElevator: ConfigElevatorState;
        Simulation: SimState;
    };
}
