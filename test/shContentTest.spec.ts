'use strict'

import { ShContent, ShServer } from '../src'
import { expect } from 'chai'
import Debug from 'debug';
import { ShConstTest } from './ShConstTest';
import { ShContext } from '../src/shio/ShContext';

const debug = Debug("shio-sdk:test-ShContent");

const shServer = new ShServer(ShConstTest.endpoint);

describe('ShContent', () => {    
    it('Should return name of Home Folder', async () => {
        let shContext = new ShContext(ShConstTest.urlTest);
        let shContent = new ShContent(shServer, shContext);
        let content = await shContent.getContent();
        debug(content);
        expect(content.system.title).equals('Home')
    })
})

