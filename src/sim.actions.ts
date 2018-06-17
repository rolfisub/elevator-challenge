import { ConfigElevator } from './config/config.types';
import { ThunkAction } from 'redux-thunk';
import { SimState } from './sim.types';
import { Dispatch } from 'redux';

export const simActionCreators = {
    create: (config: ConfigElevator): ThunkAction<void, SimState, void> => {
        return (dispatch: Dispatch<SimState>) => {
            //logic to create initial state of each elevator
        };
    }
};
