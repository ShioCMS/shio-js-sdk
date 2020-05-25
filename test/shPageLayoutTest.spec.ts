'use strict'

import { ShPageLayout, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';

const shServer = new ShServer(ShConstTest.endpoint);

describe('ShPageLayout', () => {
    
    it('Should return test', async () => {
        let pageLayoutName = "viglet_home_layout";
        let shPageLayout = new ShPageLayout(shServer, ShConstTest.urlTest);
        expect(await shPageLayout.getPageLayoutName()).equals(pageLayoutName.toLowerCase())
    })
})