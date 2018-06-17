import * as React from 'react';
import { Grid } from '@material-ui/core';
import ConfigForm from './forms/config.form';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';

const store = createStore();

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Grid container={true}>
                    <Grid item={true} xs={12} md={12} lg={12}>
                        <ConfigForm />
                    </Grid>
                </Grid>
            </Provider>
        );
    }
}

export default App;
