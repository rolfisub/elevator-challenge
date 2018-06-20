/**
 * elevator behaviour
 */
import { store } from './redux/createStore';
import { SimulationState } from './sim.types';
import { Store } from 'redux';

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
    }
}

export const elevatorBehaviour = new ElevatorBehaviour(store);
