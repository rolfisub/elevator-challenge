import { Model } from './common/redux.common';

interface EventLoopFunction extends Model {
    function: () => void;
}

export class SimEventloop {
    private intervalInstance;
    private functions: EventLoopFunction[] = [];

    constructor(protected interval: number) {
        this.startEventLoop = this.startEventLoop.bind(this);
        this.stopEventLoop = this.stopEventLoop.bind(this);
        this.addFunction = this.addFunction.bind(this);
    }

    addFunction(func: EventLoopFunction) {
        this.functions.push(func);
    }

    startEventLoop() {
        this.intervalInstance = setInterval(() => {
            for (
                let index: number = 0;
                index < this.functions.length;
                index++
            ) {
                //execute function in event loop
                this.functions[index].function();
            }
        }, this.interval);
    }

    stopEventLoop() {
        clearInterval(this.intervalInstance);
    }
}

export const mainEventLoop = new SimEventloop(1000);
