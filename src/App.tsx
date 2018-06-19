import * as React from 'react';
import { Grid } from '@material-ui/core';
import ConfigForm from './config/config.form';
import { Provider } from 'react-redux';
import { store } from './redux/createStore';
import SimContainer from './sim.container';

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <ConfigForm />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <SimContainer />
                    </Grid>
                </Grid>
            </Provider>
        );
    }
}

export default App;
