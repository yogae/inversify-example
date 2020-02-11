import { injectable, inject } from 'inversify';
import { TYPES } from './constant/types';
import { IHelloService } from './service/HelloService';

export interface IRobot {
    start(): void
}

@injectable()
export class Robot implements IRobot {
    private helloService: IHelloService;
    constructor(
        @inject(TYPES.HelloService) helloService: IHelloService
    ) {
        this.helloService = helloService;
    }

    start() {
        this.helloService.hello('hello');
    }
}