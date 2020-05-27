'use strict'

import { ShObject, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';

const shServer = new ShServer(ShConstTest.endpoint);

describe('ShObject generateObjectLink', () => {
    it('Should return Object URL', async () => {
        let shObject = new ShObject(shServer);
        expect(await shObject.generateObjectLink("0c271964-a122-4126-8ba7-8b6ae65a9424"))
        .equals("/sites/viglet/default/en-us/developers/")
    })
})

describe('ShObject generateFolderLink', () => {
    it('Should return Folder URL', async () => {
        let shObject = new ShObject(shServer);
        expect(await shObject.generateFolderLink("0c271964-a122-4126-8ba7-8b6ae65a9424"))
        .equals("/sites/viglet/default/en-us/developers/")
    })
})
describe('ShObject generatePostLink', () => {
    it('Should return Post URL', async () => {
        let shObject = new ShObject(shServer);
        expect(await shObject.generatePostLink("ba8417db-5971-4900-9515-e4c41d5f6bfd"))
        .equals("/sites/viglet/default/en-us/index")
    })
})

describe('ShObject navigation', () => {
    it('Should return id', async () => {
        let shObject = new ShObject(shServer);
        let navigation = await shObject.navigation("Viglet", true);
        expect(navigation[0].furl).equals('home')
    })
})

describe('ShObject generateImageLink', () => {
    it('Should return id', async () => {
        let shObject = new ShObject(shServer);
        expect(await shObject.generateImageLink("59ff2ee0-277d-4605-8ba5-2176404dca0c", 70))
        .equals("/image/scale/70/Viglet/_static_files/img/vecchio_bridge.jpg")
    })
})