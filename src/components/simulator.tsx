import * as React from 'react';
import { Elevator, Floor, Simulation } from '../sim.types';
import { Grid } from '@material-ui/core';
import { ElevatorBtn } from './elevator.btn';
import { RequestBtn } from './request.btn';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import { ConfigElevator } from '../config/config.types';

interface SimulatorProps {
    simulation: Simulation;
    config: ConfigElevator;
}

export const Simulator = (props: SimulatorProps) => {
    const { simulation, config } = props;
    let floorCount: number =
        typeof config.floors === 'string'
            ? parseInt(config.floors, 10)
            : config.floors;
    floorCount--;
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {simulation.elevators.map(
                                    (e: Elevator, index) => {
                                        return (
                                            <TableCell key={index}>
                                                Elevator {e._id + 1}
                                            </TableCell>
                                        );
                                    }
                                )}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...simulation.floors]
                                .reverse()
                                .map((f: Floor, indexF) => {
                                    return (
                                        <TableRow key={indexF}>
                                            {simulation.elevators.map(
                                                (e: Elevator, index) => {
                                                    return (
                                                        <TableCell key={index}>
                                                            <ElevatorBtn
                                                                active={
                                                                    e.currentFloor ===
                                                                    f._id
                                                                }
                                                                key={indexF}
                                                            />
                                                        </TableCell>
                                                    );
                                                }
                                            )}
                                            <TableCell>
                                                {f._id === floorCount ? null : (
                                                    <RequestBtn
                                                        direction={'up'}
                                                        currentFloor={f}
                                                        config={config}
                                                    />
                                                )}

                                                {f._id === 0 ? null : (
                                                    <RequestBtn
                                                        direction={'down'}
                                                        currentFloor={f}
                                                        config={config}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </div>
    );
};
