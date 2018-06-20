/**
 * this class will try to route requests to elevators based on the logic defined
 */
import { Elevator, Request, SimState } from './sim.types';
import { store } from './redux/createStore';
import { Store } from 'redux';
import { ConfigElevatorState } from './config/config.types';
import { simActionCreators } from './sim.actions';
import { Model } from './common/redux.common';
import { mainEventLoop } from './sim.eventloop';

interface SimulationState {
    reducers: {
        ConfigElevator: ConfigElevatorState;
        Simulation: SimState;
    };
}

export interface AssignRequest extends Model {
    request: Request;
}

class SimController {
    protected state: SimulationState;
    constructor(protected simStore: Store<SimulationState>) {
        this.updateState = this.updateState.bind(this);
        this.getAvailableElevators = this.getAvailableElevators.bind(this);
        this.assignRequestToElevator = this.assignRequestToElevator.bind(this);
        this.testFunc = this.testFunc.bind(this);
    }

    testFunc() {
        console.log('tick');
        console.log(this.state);
    }
    testFunc2() {
        console.log('tock');
    }

    updateState() {
        this.state = this.simStore.getState();
    }

    handleRequest(request: Request) {
        //get current state
        this.updateState();

        //log request
        console.log('request received: ', request);

        //get all available elevators
        const availableElevators: Elevator[] = this.getAvailableElevators(
            request
        );

        if (availableElevators.length > 0) {
            //we have available elevators, get the closest one
            const closestElevator: Elevator = this.getClosestElevator(
                availableElevators,
                request
            );
            console.log('closest elevator: ', closestElevator);

            //now we need to assign the request to that elevator :-)
            this.assignRequestToElevator(request, closestElevator);

            mainEventLoop.addFunction({
                _id: 7,
                function: this.testFunc
            });
            mainEventLoop.addFunction({
                _id: 8,
                function: this.testFunc2
            });

            mainEventLoop.startEventLoop();
        } else {
            //add to a queue of pending requests?
        }
    }

    assignRequestToElevator(request: Request, elevator: Elevator) {
        console.log('assigning to elevator ' + elevator._id);
        const assignRequest: AssignRequest = {
            _id: elevator._id,
            request: { ...request }
        };
        this.simStore.dispatch(
            simActionCreators.addRequestToElevator(assignRequest)
        );
    }

    /**
     * returns the closest available elevator
     * @param {Elevator[]} elevators
     * @param {Request} request
     * @returns {Elevator}
     */
    getClosestElevator(elevators: Elevator[], request: Request): Elevator {
        for (let e: number = 0; e < elevators.length; e++) {
            const elevator = elevators[e];
            if (elevator.currentFloor === request.from) {
                //just return the first elevator that is on the same floor
                return elevator;
            }
        }

        //build a proximity array with all the elevators
        interface ElevatorProximity extends Elevator {
            proximity: number;
        }
        const elevatorsProximity: ElevatorProximity[] = [];
        for (let e: number = 0; e < elevators.length; e++) {
            const elevator = elevators[e];
            elevatorsProximity.push({
                ...elevator,
                proximity: Math.abs(elevator.currentFloor - request.from)
            });
        }

        elevatorsProximity.sort(
            (a: ElevatorProximity, b: ElevatorProximity) => {
                if (a.proximity < b.proximity) {
                    return -1;
                }
                if (a.proximity > b.proximity) {
                    return 1;
                }
                return 0;
            }
        );

        //we return the closest elevator to the request
        return elevatorsProximity[0];
    }

    /**
     * returns elevators that are available for the request
     * @param {Request} request
     * @returns {Elevator[] | void}
     */
    getAvailableElevators(request: Request): Elevator[] {
        const { elevators } = this.state.reducers.Simulation.current;

        /*use this variable when considering elevator capacity*/
        //const { elevatorCapacity } = this.state.reducers.ConfigElevator.current;

        return elevators.filter((e: Elevator) => {
            if (!e.maintenance) {
                //is elevator is moving?
                if (e.direction !== 'none') {
                    if (request.direction === e.direction) {
                        if (e.direction === 'down') {
                            return e.currentFloor > request.from;
                        } else {
                            return e.currentFloor < request.from;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }
}

const controller = new SimController(store);
export default controller;
