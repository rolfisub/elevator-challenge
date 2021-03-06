import * as React from 'react';
import { renderTextField } from '../common/render.fields';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ConfigElevator, ConfigElevatorState } from './config.types';
import { Button } from '@material-ui/core';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import { configFormActionCreators } from './config.actions';

interface ConfigFormProps {
    generate?: (c: ConfigElevator) => void;
    initialValues?: ConfigElevator;
}

class ConfigForm extends React.Component<
    ConfigFormProps & InjectedFormProps<ConfigElevator>
> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(config: ConfigElevator) {
        if (this.props.generate) {
            this.props.generate(config);
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div>
                    <Field
                        name={'floors'}
                        label={'Floors'}
                        component={renderTextField}
                    />
                    <Field
                        name={'elevators'}
                        label={'Number of Elevators'}
                        component={renderTextField}
                    />
                    <Field
                        name={'elevatorCapacity'}
                        label={'Elevator Capacity'}
                        component={renderTextField}
                    />
                    <Button
                        variant={'raised'}
                        color={'primary'}
                        style={{ margin: 10 }}
                        disabled={this.props.invalid}
                        type={'submit'}
                    >
                        Generate
                    </Button>
                </div>
            </form>
        );
    }
}

export const ConfigFormReduxForm = reduxForm({
    form: 'ConfigForm',
    enableReinitialize: true
})(ConfigForm);

const mapStateToProps = (state, props: ConfigFormProps): ConfigFormProps => {
    const redux: ConfigFormProps = {
        ...props,
        initialValues: state.reducers.ConfigElevator.current
    };
    return redux;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ThunkAction<void, ConfigElevatorState, void> | any>,
    props: ConfigFormProps
) => {
    const redux: ConfigFormProps = {
        ...props,
        generate: (c: ConfigElevator) => {
            dispatch(configFormActionCreators.create(c));
        }
    };
    return redux;
};

const ConfigFormConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigFormReduxForm);

export default ConfigFormConnected;
