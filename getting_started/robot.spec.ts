import 'reflect-metadata';
import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';

import { Robot, IRobot } from './robot';
import { IHelloService } from './service/helloService';
import { container } from './inversify.config';
import { TYPES } from './constant/types';

const helloService = container.get<IHelloService>(TYPES.HelloService);

let robot: IRobot;
describe('robot test', function () {
    describe('spy test', function () {
        let helloSpy: sinon.SinonSpy;
        before(function () {
            helloSpy = sinon.spy(helloService, 'hello');
            robot = new Robot(helloService);
        });

        after(function () {
            sinon.restore();
        })

        it('test', function () {
            const name = 'yogae';
            const res = robot.start(name);
            chai.expect(res.startsWith('hello')).to.be.equal(true);
            chai.expect(helloSpy.calledOnce).to.be.equal(true);

            const [argName] = helloSpy.getCall(0).args;
            chai.expect(argName).to.be.equal(name);
        });
    });

    describe('stub test', function () {
        let helloStub: sinon.SinonStub;
        before(function () {
            helloStub = sinon.stub(helloService, 'hello').returns('stubhello');
            robot = new Robot(helloService);
        });

        after(function () {
            sinon.restore();
        })

        it('test', function () {
            const name = 'yogae';
            const res = robot.start(name);
            chai.expect(res).to.be.equal('stubhello');
            chai.expect(helloStub.calledOnce).to.be.equal(true);

            const [argName] = helloStub.getCall(0).args;
            chai.expect(argName).to.be.equal(name);
        });
    });

    describe('mock test', function () {
        let helloMock: sinon.SinonMock;
        let helloExpection: sinon.SinonExpectation;
        before(function () {
            helloMock = sinon.mock(helloService);
            helloExpection = helloMock.expects('hello');
            robot = new Robot(helloService);
        });

        after(function () {
            sinon.restore();
        })

        it('test', function () {
            const name = 'yogae';
            const res = robot.start(name);

            const [argName] = helloExpection.getCall(0).args;
            chai.expect(argName).to.be.equal(name);
            helloMock.verify();
        });
    });
});