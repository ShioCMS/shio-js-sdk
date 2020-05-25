'use strict'

import { ShContent, ShServer } from '../src'
import { expect } from 'chai'
import Debug from 'debug';
import { ShConstTest } from './shConstTest';

const debug = Debug("shio-sdk:test-shContent");

const shServer = new ShServer(ShConstTest.endpoint);

describe('shContent', () => {    
    it('Should return name of Home Folder', async () => {
        let shContent = new ShContent(shServer);
        let content = await shContent.getContent(ShConstTest.urlTest);
        debug(content);
        expect(content.system.title).equals('Home')
    })
})

