import { ShPageLayout } from './../src'
import { expect } from 'chai'

describe('ShPageLayout', () => {
    it('Should return test', () => {
        let pageLayoutName = "PageLayout1";
        let shPageLayout = new ShPageLayout(pageLayoutName);
        expect(shPageLayout.getPageLayoutName()).equals(pageLayoutName.toLowerCase())
    })
})