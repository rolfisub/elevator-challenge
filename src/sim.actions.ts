import { ConfigElevator } from './config/config.types';
import { ThunkAction } from 'redux-thunk';
import {Elevator, Floor, SimActionTypes, SimState, Simulation} from './sim.types';
import { Dispatch } from 'redux';
import {Action, Payload} from "./common/redux.common";

export const simActionCreators = {
    create: (config: ConfigElevator): ThunkAction<void, SimState, void> => {
        return (dispatch: Dispatch<SimState>) => {

            const availableFloors: Floor[] = [];
            for(let f: number = 0; f < config.floors; f++) {
                availableFloors.push({
                    _id: f
                });
            }

            //logic to create initial state of each elevator
            const elevators: Elevator[] = [];
            for(let e: number = 0; e < config.elevators; e++) {
                elevators.push({
                    _id: e,
                    direction: "none",
                    currentFloor: 0,
                    availableFloors: [...availableFloors],
                    requests: []
                });
            }

            const payload: Payload<Simulation> = {
                data: {
                    _id: 0,
                    elevators: [...elevators]
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
