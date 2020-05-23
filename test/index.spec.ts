import { ShContent, ShPageLayout, ShRegion, ShObject } from './../src'
import { expect } from 'chai'

describe('shContent', () => {
    it('Should return id', async () => {
        let shContent = new ShContent();
        let content = await shContent.getContent();
        expect(content.system.id).equals('7ba3966f-a13d-4268-9a38-364bdd7be9db')
    })
})

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
describe('ShRegion', () => {
    it('Should return name of region', () => {
        let shRegion = new ShRegion("region1");
        expect(shRegion.regionName).equals('region1')
    })
})
describe('ShPageLayout', () => {
    it('Should return test', () => {
        let shPageLayout = new ShPageLayout("aaa");
        expect(shPageLayout.test("123")).equals('123')
    })
})