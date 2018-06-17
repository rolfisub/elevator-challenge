import { Model } from '../common/redux.common';

export interface ConfigElevator extends Model {
    floors: number;
    elevators: number;
    elevatorCapacity: number;
}
