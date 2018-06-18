import { ActionTypes, Model, StoreState } from './common/redux.common';

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

export const SimActionTypes: ActionTypes = new ActionTypes('Sim');
