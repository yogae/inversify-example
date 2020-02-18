import { injectable, inject, targetName } from 'inversify';
import { TYPES } from './constant/types';
import { ISpeakService } from './service/speakService';

export interface IRobot {
    start(name: string): Promise<void>
}

@injectable()
export class Robot implements IRobot {
    private factoryService: (name: 'hi' | 'hello') => ISpeakService;
    private providerService: () => Promise<void>;
    constructor(
        @inject(TYPES.FactoryService) factoryService: (name: 'hi' | 'hello') => ISpeakService,
        @inject(TYPES.ProviderService) providerService: () => Promise<void>,
    ) {
        this.factoryService = factoryService;
        this.providerService = providerService;
    }

    async start(name: string): Promise<void> {
        await this.providerService();
        const hiService = this.factoryService('hi');
        hiService.speak(name);

        const helloService = this.factoryService('hello');
        helloService.speak(name);
    }
}