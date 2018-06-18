/**
 * this class will try to route requests to elevators based on the logic defined
 */
import { Request } from './sim.types';

class SimController {
    handleRequest(request: Request) {
        //Logic to determine which elevator should address the request
        console.log(request);
    };
}

const controller = new SimController();
export default controller;
