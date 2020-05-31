'use strict'

import { ShPageLayout, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';
import { ShContext } from '../src/shio/ShContext';

const shServer = new ShServer(ShConstTest.endpoint);

describe('ShPageLayout', () => {
    
    it('Should return test', async () => {
        let pageLayoutName = "VIGLET_HOME_LAYOUT";
        let shContext = new ShContext(ShConstTest.urlTest);
        let shPageLayout = new ShPageLayout(shServer, shContext);
        expect(await shPageLayout.getPageLayoutName()).equals(pageLayoutName)
    })
})