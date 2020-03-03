import { injectable } from 'inversify';

export interface ISpeakService {
    speak(name: string): string
}

@injectable()
export class HelloService implements ISpeakService {
    speak(name: string) {
        return `hello ${name}`;
    }
}

@injectable()
export class HiService implements ISpeakService {
    speak(name: string) {
        return `hi ${name}`;
    }
}