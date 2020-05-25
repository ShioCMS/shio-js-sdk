'use strict'

import { ShServer } from '../src'
import { expect } from 'chai'
import Debug from 'debug';
import { ShConstTest } from './ShConstTest';

const debug = Debug("shio-sdk:test-ShServer");

const shServer = new ShServer(ShConstTest.endpoint)

describe('ShServer', () => {
    it('Should check if exists <title> tag', async () => {
        shServer.setTemplatePath(ShConstTest.templatePath);
        let html = await shServer.getPage(ShConstTest.urlTest);
        debug(html);
        expect(html).contains("<title>");
    })
})

