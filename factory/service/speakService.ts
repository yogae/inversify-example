import { injectable } from 'inversify';

export interface ISpeakService {
    speak(name: string): void
}

@injectable()
export class HelloService implements ISpeakService {
    speak(name: string) {
        console.log(`hello ${name}`);
    }
}

@injectable()
export class HiService implements ISpeakService {
    speak(name: string) {
        console.log(`hi ${name}`);
    }
}