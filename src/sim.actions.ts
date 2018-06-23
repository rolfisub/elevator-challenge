import { ConfigElevator } from './config/config.types';
import { ThunkAction } from 'redux-thunk';
import {
    Elevator,
    Floor,
    Request,
    SimActionTypes,
    SimState,
    Simulation
} from './sim.types';
import { Dispatch } from 'redux';
import { Action, Payload } from './common/redux.common';
import { AssignRequest } from './sim.controller';

export const simActionCreators = {
    create: (config: ConfigElevator): ThunkAction<void, SimState, void> => {
        return (dispatch: Dispatch<SimState>) => {
            const allFloors: Floor[] = [];
            const floors =
                typeof config.floors === 'string'
                    ? parseInt(config.floors, 10)
                    : config.floors;
            for (let f: number = 0; f < floors; f++) {
                allFloors.push({
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
                    requests: [],
                    moves: [],
                    trips: 0,
                    maintenance: false
                });
            }

            const payload: Payload<Simulation> = {
                data: {
                    _id: 0,
                    elevators: [...elevators],
                    floors: [...allFloors]
                },
                list: []
            };

            const action: Action<Simulation> = {
                type: SimActionTypes.create,
                payload
            };

            dispatch(action);
        };
    },
    addRequestToElevator(request: AssignRequest) {
        return (dispatch: Dispatch<SimState>, getState) => {
            const state = getState();
            const payload: Payload<Simulation> = {
                data: {
                    ...state.reducers.Simulation.current
                },
                list: []
            };

            payload.data.elevators[request._id].requests.push({
                ...request.request
            });

            //if elevator has no direction set it
            if (payload.data.elevators[request._id].direction === 'none') {
                payload.data.elevators[request._id].direction =
                    request.request.direction;
            }

            //sort requests based on current direction
            const { direction } = payload.data.elevators[request._id];
            if (direction === 'down') {
                payload.data.elevators[request._id].requests.sort(
                    (a: Request, b: Request) => {
                        if (a.from > b.from) {
                            return -1;
                        }
                        if (a.from < b.from) {
                            return 1;
                        }
                        return 0;
                    }
                );
            } else {
                payload.data.elevators[request._id].requests.sort(
                    (a: Request, b: Request) => {
                        if (a.from > b.from) {
                            return 1;
                        }
                        if (a.from < b.from) {
                            return -1;
                        }
                        return 0;
                    }
                );
            }

            //add to moves array
            payload.data.elevators[request._id].moves.push(
                request.request.from
            );
            payload.data.elevators[request._id].moves.push(request.request.to);

            if (direction === 'down') {
                payload.data.elevators[request._id].moves.sort();
                payload.data.elevators[request._id].moves.reverse();
            } else {
                payload.data.elevators[request._id].moves.sort();
            }

            //remove duplicates
            payload.data.elevators[request._id].moves.filter(
                (a, index, array) => {
                    return array.indexOf(a) < 0;
                }
            );

            const action: Action<Simulation> = {
                type: SimActionTypes.assignRequest,
                payload
            };

            dispatch(action);
        };
    },
    elevatorMove(direction: 'up' | 'down' | "same", elevator: Elevator) {
        return (dispatch: Dispatch<SimState>, getState) => {
            const state = getState();
            const payload: Payload<Simulation> = {
                data: {
                    ...state.reducers.Simulation.current
                },
                list: []
            };

            if (direction === 'up') {
                payload.data.elevators[elevator._id].currentFloor++;
            } else if (direction === "down") {
                payload.data.elevators[elevator._id].currentFloor--;
            }

            if (
                payload.data.elevators[elevator._id].currentFloor ===
                payload.data.elevators[elevator._id].moves[0]
            ) {
                payload.data.elevators[elevator._id].moves.shift();
            }

            if (payload.data.elevators[elevator._id].moves.length === 0) {
                payload.data.elevators[elevator._id].direction = 'none';
            }

            const action: Action<Simulation> = {
                type: SimActionTypes.create,
                payload
            };

            dispatch(action);
        };
    }
};
