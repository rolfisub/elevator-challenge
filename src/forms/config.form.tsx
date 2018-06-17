import * as React from 'react';
import { renderTextField } from '../common/render.fields';
import {InjectedFormProps} from "redux-form";
import {ConfigElevator} from "./config.types";

interface ConfigFormProps extends InjectedFormProps<ConfigElevator> {
    handleSubmit: () => void;
}

class ConfigForm extends React.Component<ConfigFormProps> {

    constructor(props:ConfigFormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        return;
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)} >

            </form>
        );
    }
}
