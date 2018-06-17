import * as React from 'react';
import { Grid } from '@material-ui/core';
import ConfigForm from './forms/config.form';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import {SimContainer} from "./components/sim.container";

const store = createStore();

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Grid container={true}>
                    <Grid item={true} xs={12} md={12} lg={12}>
                        <ConfigForm />
                    </Grid>
                    <Grid item={true} xs={12} md={12} lg={12}>
                        <SimContainer
                            ConfigElevator={{
                                _id: 0,
                                elevators: 10,
                                floors: 100,
                                elevatorCapacity: 2
                            }}
                        />
                    </Grid>
                </Grid>
            </Provider>
        );
    }
}

export default App;
