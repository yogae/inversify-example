import 'reflect-metadata';
import { container } from './inversify.config';
import { TYPES } from './constant/types';
import { describe } from 'mocha';
import * as sinon from 'sinon';
import { Robot, IRobot } from './robot';
import { ISpeakService } from './service/speakService';
import { IConnectService } from './service/connectService';
import * as chai from 'chai';

const factoryService = container.get<(name: string) => ISpeakService>(TYPES.FactoryService);
const provider = container.get<() => Promise<void>>(TYPES.ProviderService);

let robot: IRobot;
let helloStub: sinon.SinonStub;
let hiStub: sinon.SinonStub;
describe('robot test', function () {
    const helloService = factoryService('hello');
    const hiService = factoryService('hi');
    before(function () {
        const factoryStub = sinon.stub();
        helloStub = sinon.stub(helloService, 'speak');
        hiStub = sinon.stub(hiService, 'speak');

        factoryStub.withArgs('hello').returns(helloService);
        factoryStub.withArgs('hi').returns(hiService);

        const providerStub = sinon.stub();
        providerStub.returns(Promise.resolve('test'));

        robot = new Robot(
            factoryStub,
            providerStub
        );
    })

    it('start', async function () {
        const name = 'yogae';
        const res = await robot.start(name);

        const [helloName] = helloStub.getCall(0).args;
        const [hiName] = hiStub.getCall(0).args;

        chai.expect(helloName).to.be.equal(name);
        chai.expect(hiName).to.be.equal(name);
    });
});