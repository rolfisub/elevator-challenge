import { ActionTypes, Model, StoreState } from '../common/redux.common';

export interface ConfigElevator extends Model {
    floors: number;
    elevators: number;
    elevatorCapacity: number;
}

export interface ConfigElevatorState extends StoreState<ConfigElevator> {}

export const ConfigElevatorActionTypes: ActionTypes = new ActionTypes(
    'ConfigElevator'
);
