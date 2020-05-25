'use strict'
import fs from 'fs';
import cheerio from 'cheerio';
import requireFromString from 'require-from-string'
import { request } from 'graphql-request';
import { ShRegion } from './ShRegion';
import { ShServer } from './ShServer';
import Debug from 'debug';

const debug = Debug("shio-sdk:ShPageLayout");

export class ShPageLayout {
    private shServer: ShServer;
    private url: string;

    public constructor(shServer: ShServer, url: string) {
        this.shServer = shServer;
        this.url = url;
    }



    public async readPageLayout(filePath: string, shContent: any, shObject: any) {
        var data = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(data.toString());

        var promises = [];
        var cheerioEach = async function () {
            var shRegion = $(this);
            var regionName = shRegion.attr("sh-region");
            var region = new ShRegion(regionName);
            var html = await region.render(shContent, shObject);
            shRegion.html(html);
            promises.push(html);
        }
        $('[sh-region]').each(cheerioEach);
        await Promise.all(promises);
        return $.html();

    }

    public async getPageLayoutName(): Promise<string> {
        let pageLayoutName: string;
        const objectQuery = `{
            objectFromURL(url: "${this.url}") {   
              pageLayout
            }
          }`;

        await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
            debug(objectData);
            pageLayoutName = objectData.objectFromURL.pageLayout;
        }
        )
        return pageLayoutName;
    }

    public async render(shContent: any, shObject: any): Promise<string> {

        let pageLayoutName = await this.getPageLayoutName();
        var commonPath = `./src/template/viglet/pageLayout/${pageLayoutName}/${pageLayoutName}`;
        var html = await this.readPageLayout(`${commonPath}.hbs`, shContent, shObject);
        var js = fs.readFileSync(`${commonPath}.js`, 'utf-8').toString();
        var pageLayoutJS = requireFromString(js);
        return pageLayoutJS.render(shContent, shObject, html);
    };

}