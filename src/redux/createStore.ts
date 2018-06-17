import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './allReducers';
import { reducer as formReducer } from 'redux-form';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
}

export default () => {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    const enhancer = composeEnhancers(applyMiddleware(thunk));

    return createStore(
        combineReducers({
            reducers,
            form: formReducer
        }),
        enhancer
    );
};
