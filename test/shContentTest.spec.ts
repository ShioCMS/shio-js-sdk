import { ShContent, ShServer } from '../src'
import { expect } from 'chai'
import Debug from 'debug';

const debug = Debug("shio-sdk:test-shContent");

const shServer = new ShServer("https://shio.viglet.net/graphql");

describe('shContent', () => {
    it('Should return name of Home Folder', async () => {
        let shContent = new ShContent(shServer);
        let content = await shContent.getContent("/sites/viglet/default/en-us");
        debug(content);
        expect(content.system.title).equals('Home')
    })
})

