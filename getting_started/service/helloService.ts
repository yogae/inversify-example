import { injectable } from 'inversify';

export interface IHelloService {
    hello(str: string): string
}

@injectable()
export class HelloService implements IHelloService {
    hello(str: string): string {
        return `hello ${str}`;
    }
}