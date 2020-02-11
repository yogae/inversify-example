import { Container } from 'inversify';
import { TYPES } from './constant/types'
import { Robot, IRobot } from './robot';
import { HelloService, IHelloService } from './service/helloService';

const container = new Container();

container.bind<IHelloService>(TYPES.HelloService).to(HelloService);
container.bind<IRobot>(TYPES.Robot).to(Robot);

export {
    container
}