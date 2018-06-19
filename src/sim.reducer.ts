import { Action } from './common/redux.common';
import { SimActionTypes, SimState, Simulation } from './sim.types';

export default (
    state: SimState = {
        current: {
            _id: 0,
            elevators: [],
            floors: []
        },
        list: []
    },
    action: Action<Simulation>
) => {
    switch (action.type) {
        case SimActionTypes.create: {
            if (action.payload && state.current) {
                const newState: SimState = {
                    current: { ...action.payload.data },
                    list: [...state.list]
                };
                return newState;
            }
            break;
        }
        case SimActionTypes.assignRequest: {
            if (action.payload && state.current) {
                if (action.payload && state.current) {
                    const newState: SimState = {
                        current: { ...action.payload.data },
                        list: [...state.list]
                    };
                    return newState;
                }
                break;
            }
            break;
        }
        default:
            return state;
    }
    return state;
};
