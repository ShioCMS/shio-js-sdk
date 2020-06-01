'use strict'

import { ShServer } from '../src'
import { expect } from 'chai'
import Debug from 'debug';
import { ShConstTest } from './ShConstTest';

const debug = Debug("shio-sdk:test-ShServer");

describe('ShServer', () => {
    it('Should check if exists <title> tag', async () => {
        let shServer = new ShServer();        
        let html = await shServer.getPage(ShConstTest.urlTest);
        debug(html);
        expect(html).contains("<title>");
    })
})

