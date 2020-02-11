import { injectable } from 'inversify';

export interface IHelloService {
    hello(str: string): void
}

@injectable()
export class HelloService implements IHelloService {
    hello(str: string) {
        console.log(str);
    }
}