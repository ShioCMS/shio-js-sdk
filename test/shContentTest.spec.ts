'use strict'

import { ShContent, ShServer } from '../src'
import { expect } from 'chai'
import Debug from 'debug';
import { ShConstTest } from './ShConstTest';

const debug = Debug("shio-sdk:test-ShContent");

const shServer = new ShServer(ShConstTest.endpoint);

describe('ShContent', () => {    
    it('Should return name of Home Folder', async () => {
        let shContent = new ShContent(shServer);
        let content = await shContent.getContent(ShConstTest.urlTest);
        debug(content);
        expect(content.system.title).equals('Home')
    })
})

