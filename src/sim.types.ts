import { ActionTypes, Model, StoreState } from './common/redux.common';

export interface Request {
    from: number;
    to: number;
}

export interface Floor extends Model {}

export interface Elevator extends Model {
    currentFloor: number;
    direction: 'up' | 'down' | 'none';
    availableFloors: Floor[];
    requests: Request[];
}

export interface Simulation extends Model {
    elevators: Elevator[];
}

export interface SimState extends StoreState<Simulation> {}

export const SimActionTypes: ActionTypes = new ActionTypes('Sim');
