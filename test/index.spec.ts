import { shContent, ShPageLayout } from './../src'
import { expect } from 'chai'

describe('shContent', () => {
    it('Should return id', () => {
        expect(shContent.system.id).equals('id')
    })
})

describe('ShPageLayout', () => {
    it('Should return test', () => {
        let shPageLayout = new ShPageLayout("aaa");
        expect(shPageLayout.test("123")).equals('123')
    })
})