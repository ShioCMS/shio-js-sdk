import Debug from 'debug';
import { ShConfigApp } from './ShConfigApp';
import { ShConfigServer } from './ShConfigServer';

const debug = Debug("shio-sdk:ShioConfig");

export class ShConfig {
    public app: ShConfigApp;

    public shioServer: ShConfigServer;

    public test: string;

    constructor(app: ShConfigApp, shioServer: ShConfigServer) {
        this.app = app;
        this.shioServer = shioServer;
    }
}