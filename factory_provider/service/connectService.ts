import { injectable } from 'inversify';

export interface IConnectService {
    connect(): Promise<void>
}

@injectable()
export class ConnectService {
    public connect(): Promise<void> {
        return new Promise((resolve) => {
            console.log('connecting');
            setTimeout(() => {
                console.log('connected');
                resolve();
            }, 3000);
        })

    }
}