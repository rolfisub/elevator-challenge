import {
    ConfigElevator,
    ConfigElevatorActionTypes,
    ConfigElevatorState
} from './config.types';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { Action, Payload } from '../common/redux.common';

export const configFormActionCreators = {
    create(
        config: ConfigElevator
    ): ThunkAction<void, ConfigElevatorState, void> {
        return (dispatch: Dispatch<ConfigElevatorState>) => {
            const payload: Payload<ConfigElevator> = {
                data: { ...config },
                list: []
            };

            const action: Action<ConfigElevator> = {
                type: ConfigElevatorActionTypes.create,
                payload
            };

            dispatch(action);
        };
    }
};
