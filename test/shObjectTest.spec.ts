'use strict'

import { ShObject, ShServer } from '../src'
import { expect } from 'chai'
import { ShConstTest } from './ShConstTest';

const shServer = new ShServer(ShConstTest.endpoint);

describe('ShObject generateObjectLink', () => {
    it('Should return Object URL', async () => {
        let url: string = "/sites/viglet/default/en-us/developers/";
        let shObject: any = new ShObject(shServer);
        let object: any = await shObject.getObjectFromURL(url);
        expect(await shObject.generateObjectLink(object.id))
            .equals(url)
    })
})

describe('ShObject generateFolderLink', () => {
    it('Should return Folder URL', async () => {
        let url: string = "/sites/viglet/default/en-us/developers/";
        let shObject = new ShObject(shServer);
        let object: any = await shObject.getObjectFromURL(url);
        expect(await shObject.generateFolderLink(object.id))
            .equals("/sites/viglet/default/en-us/developers/")
    })
})
describe('ShObject generatePostLink', () => {
    it('Should return Post URL', async () => {
        let url: string = "/sites/stock/default/en-us/sample-blog-post";
        let shObject = new ShObject(shServer);
        let object: any = await shObject.getObjectFromURL(url);
        expect(await shObject.generatePostLink(object.id))
            .equals(url)
    })
})

describe('ShObject navigation', () => {
    it('Should return id', async () => {
        let shObject = new ShObject(shServer);
        let navigation = await shObject.navigation("Viglet", true);
        expect(navigation[0].furl).equals('home')
    })
})

/*
describe('ShObject generateImageLink', () => {
    it('Should return id', async () => {
        let shObject = new ShObject(shServer);
        expect(await shObject.generateImageLink("59ff2ee0-277d-4605-8ba5-2176404dca0c", 70))
            .equals("/image/scale/70/Viglet/_static_files/img/vecchio_bridge.jpg")
    })
})
*/

describe('ShObject queryByPostType', () => {
    it('Should return length of posts', async () => {
        let shObject = new ShObject(shServer);
        let posts: Array<any> = await shObject.queryByPostType("Text");
        expect(posts.length).greaterThan(2)
    })
})

describe('ShObject query', () => {
    it('Should return length of posts', async () => {
        let url: string = "/sites/stock/default/en-us/";
        let shObject = new ShObject(shServer);
        let object: any = await shObject.getObjectFromURL(url);
        let posts: Array<any> = await shObject.query(object.id, "Article");
        expect(posts.length).greaterThan(2)
    })
})