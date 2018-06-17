import {
    ConfigElevator,
    ConfigElevatorActionTypes,
    ConfigElevatorState
} from './config.types';
import { Action } from '../common/redux.common';

export default (
    state: ConfigElevatorState = {
        current: {
            _id: 0,
            elevators: 2,
            floors: 5,
            elevatorCapacity: 1
        },
        list: []
    },
    action: Action<ConfigElevator>
) => {
    switch (action.type) {
        case ConfigElevatorActionTypes.create: {
            if (action.payload && state.current) {
                const newState: ConfigElevatorState = {
                    current: { ...action.payload.data },
                    list: [...state.list]
                };
                return newState;
            }
            break;
        }
        default:
            return state;
    }
    return state;
};
