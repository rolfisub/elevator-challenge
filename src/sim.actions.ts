import { ConfigElevator } from './config/config.types';
import { ThunkAction } from 'redux-thunk';
import {
    Elevator,
    Floor,
    SimActionTypes,
    SimState,
    Simulation
} from './sim.types';
import { Dispatch } from 'redux';
import { Action, Payload } from './common/redux.common';

export const simActionCreators = {
    create: (config: ConfigElevator): ThunkAction<void, SimState, void> => {
        return (dispatch: Dispatch<SimState>) => {
            const availableFloors: Floor[] = [];
            const floors =
                typeof config.floors === 'string'
                    ? parseInt(config.floors, 10)
                    : config.floors;
            for (let f: number = 0; f < floors; f++) {
                availableFloors.push({
                    _id: f
                });
            }

            //logic to create initial state of each elevator
            const elevators: Elevator[] = [];
            const elevatorCount =
                typeof config.elevators === 'string'
                    ? parseInt(config.elevators, 10)
                    : config.elevators;
            for (let e: number = 0; e < elevatorCount; e++) {
                elevators.push({
                    _id: e,
                    direction: 'none',
                    currentFloor: 0,
                    availableFloors: [...availableFloors],
                    requests: []
                });
            }

            const payload: Payload<Simulation> = {
                data: {
                    _id: 0,
                    elevators: [...elevators],
                    floors: [...availableFloors]
                },
                list: []
            };

            const action: Action<Simulation> = {
                type: SimActionTypes.create,
                payload
            };

            dispatch(action);
        };
    }
};
