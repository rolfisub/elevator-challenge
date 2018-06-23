/**
 * elevator behaviour
 */
import { store } from './redux/createStore';
import { Elevator, SimulationState } from './sim.types';
import { Store } from 'redux';
import {simActionCreators} from "./sim.actions";

export class ElevatorBehaviour {
    protected state: SimulationState;
    constructor(protected simStore: Store<SimulationState>) {
        this.updateState = this.updateState.bind(this);
        this.elevatorMovement = this.elevatorMovement.bind(this);
    }
    updateState() {
        this.state = this.simStore.getState();
    }

    /**
     * this function is to be added to event loop it will move all the elevators
     * according to their requests
     */
    elevatorMovement() {
        this.updateState();
        const { elevators } = this.state.reducers.Simulation.current;
        elevators.forEach((e: Elevator, index) => {
            if (e.moves.length > 0) {
                //we have moves to do
                if (e.currentFloor < e.moves[0]) {
                    //dispatch move up
                    store.dispatch(simActionCreators.elevatorMove("up", e));
                } else if (e.currentFloor > e.moves[0]) {
                    //dispatch move down
                    store.dispatch(simActionCreators.elevatorMove("down", e));
                } else {
                    //same floor
                    store.dispatch(simActionCreators.elevatorMove("same", e));
                }
            }
        });
    }
}

export const elevatorBehaviour = new ElevatorBehaviour(store);
