import { ShObject } from './../src'
import { expect } from 'chai'

describe('ShObject generateFolderLink', () => {
    it('Should return id', () => {
        let shObject = new ShObject();
        expect(shObject.generateFolderLink("id")).equals('link123')
    })
})

describe('ShObject generateFolderLink', () => {
    it('Should return id', () => {
        let shObject = new ShObject();
        expect(shObject.navigation("site1", false)[0].id).equals('123')
    })
})