'use strict'

import { ShPageLayout, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';
import { ShContext } from '../src/shio/ShContext';
const shServer = new ShServer();

describe('ShPageLayout', () => {
    
    it('Should return test', async () => {
        let pageLayoutName = "VIGLET_HOME_LAYOUT";
        let shContext = new ShContext(shServer, ShConstTest.urlTest);
        let shPageLayout = new ShPageLayout(shContext);
        expect(await shPageLayout.getPageLayoutName()).equals(pageLayoutName)
    })
})