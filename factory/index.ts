import 'reflect-metadata';
import { container } from './inversify.config';
import { TYPES } from './constant/types';
import { IRobot } from './robot';

const robot = container.get<IRobot>(TYPES.Robot);

robot.start('yogae').then();