'use strict'

import { ShRegion } from './../src'
import { expect } from 'chai'

describe('ShRegion', () => {
    it('Should return name of region', () => {
        let regionName = "Region1"
        let shRegion = new ShRegion(regionName);
        expect(shRegion.getRegionName()).equals(regionName.toLowerCase())
    })
})