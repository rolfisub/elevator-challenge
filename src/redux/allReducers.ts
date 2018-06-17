import { combineReducers } from 'redux';
import ConfigElevator from '../config/config.reducer';
import Simulation from '../sim.reducer';

const allReducers = combineReducers({
    ConfigElevator,
    Simulation
});

export default allReducers;
