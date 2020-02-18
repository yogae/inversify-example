import { Container, interfaces } from 'inversify';
import { TYPES } from './constant/types'
import { Robot, IRobot } from './robot';
import { HelloService, HiService, ISpeakService } from './service/speakService';
import { ConnectService, IConnectService } from './service/connectService';

const container = new Container();

container.bind<ISpeakService>(TYPES.SpeakService).to(HelloService).whenTargetNamed('hello');
container.bind<ISpeakService>(TYPES.SpeakService).to(HiService).whenTargetNamed('hi');
container.bind<interfaces.Factory<ISpeakService>>(TYPES.FactoryService)
    .toFactory((context: interfaces.Context) => (name: string) => {
        return context.container.getNamed<ISpeakService>(TYPES.SpeakService, name);
    });

container.bind<IConnectService>(TYPES.ConnectService).to(ConnectService);
container.bind<() => Promise<void>>(TYPES.ProviderService)
    .toProvider((context: interfaces.Context) => () => {
        const connectService = context.container.get<IConnectService>(TYPES.ConnectService);
        return connectService.connect();
    });

container.bind<IRobot>(TYPES.Robot).to(Robot);

export {
    container
}