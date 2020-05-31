'use strict'

import { ShRegion, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';

const shServer = new ShServer(ShConstTest.endpoint);
describe('ShRegion', () => {
    it('Should return name of region', () => {
        
        let regionName = "Region1"
        let shRegion = new ShRegion(shServer, regionName);
        expect(shRegion.getRegionName()).equals(regionName)
    })
})