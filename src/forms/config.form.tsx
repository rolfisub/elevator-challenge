import * as React from 'react';
import { renderTextField } from '../common/render.fields';
import {Field, InjectedFormProps, default as reduxForm} from 'redux-form';
import { ConfigElevator } from './config.types';
import { Button } from '@material-ui/core';

interface ConfigFormProps {
    handleSubmit: () => void;
}

class ConfigForm extends React.Component<
    ConfigFormProps & InjectedFormProps<ConfigElevator>
> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(config: ConfigElevator) {
        return;
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

export const ConfigFormReduxForm = reduxForm( {
    form: 'ConfigForm'
})(ConfigForm);

const mapStateToProps = (state: , props:ConfigFormProps): ConfigFormProps => {
    const redux: BlueprintCreateProps = {
        submitErrors: getFormSubmitErrors('BlueprintCreateForm')(state),
        ...props
    };

    return redux;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ThunkAction<void, BlueprintStoreState, void> | any>,
    props: BlueprintCreateProps
) => {
    const redux: BlueprintCreateProps = {
        createBlueprint: (s: Blueprint) => {
            dispatch(blueprintActionCreators.create(s));
        },
        ...props
    };
    return redux;
};
