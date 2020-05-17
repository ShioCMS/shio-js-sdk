import { shContent } from './../src'
import { expect } from 'chai'

describe('shContent', () => {
    it('Should return id', () => {
        let content = shContent();
        expect(content.system.id).equals('id')
    })
})