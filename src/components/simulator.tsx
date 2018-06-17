import * as React from 'react';
import { Elevator, Floor, Simulation } from '../sim.types';
import { Grid } from '@material-ui/core';
import { ElevatorBtn } from './elevator.btn';

interface SimulatorProps {
    simulation: Simulation;
}

export const Simulator = (props: SimulatorProps) => {
    const { simulation } = props;

    return (
        <div>
            {simulation.elevators.map((e: Elevator, index) => {
                return (
                    <Grid item xs={1} key={index}>
                        {simulation.floors.map((f: Floor, indexF) => {
                            return (
                                <ElevatorBtn
                                    active={e.currentFloor === indexF}
                                    key={indexF}
                                />
                            );
                        })}
                    </Grid>
                );
            })}
        </div>
    );
};
