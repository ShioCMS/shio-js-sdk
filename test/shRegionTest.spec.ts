'use strict'

import { ShRegion, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';
import { ShContext } from '../src/shio/ShContext';

const shServer = new ShServer(ShConstTest.endpoint);
describe('ShRegion', () => {
    it('Should return name of region', () => {

        let regionName = "Region1";
        let shContext = new ShContext(shServer, ShConstTest.urlTest);
        let shRegion = new ShRegion(shContext, regionName);
        expect(shRegion.getRegionName()).equals(regionName)
    })
})