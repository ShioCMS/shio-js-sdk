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
        let shServer: ShServer = this.shServer;
        await Promise.all($('[sh-region]').map(async function () {
            var shRegion = $(this);
            var regionName = shRegion.attr("sh-region");
            var region = new ShRegion(shServer, regionName);
            var html = await region.render(shContent, shObject);
            shRegion.html(html);
            return html
        }).get());

        return $.html();
    }

    public async getPageLayoutName(): Promise<string> {
        let pageLayoutName: string;
        const objectQuery = `{
            shObjectFromURL(url: "${this.url}") {   
              pageLayout
            }
          }`;

        await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
            let graphQL: any = objectData
            debug(graphQL);
            pageLayoutName = graphQL.shObjectFromURL.pageLayout;
        }
        )
        return pageLayoutName;
    }

    public async render(shContent: any, shObject: any): Promise<string> {
        let pageLayoutName: string = await this.getPageLayoutName();
        let pageLayoutNameLC: string = pageLayoutName.toLowerCase();
        let directoryPath: string = `${this.shServer.getTemplatePath()}/pageLayout/${pageLayoutNameLC}`;
        let html: string = null;
        let js: string = null;
        let pageLayoutJS: any = null;
        if (fs.existsSync(directoryPath)) {
            let commonPath: string = `${directoryPath}/${pageLayoutName}`;
            html = await this.readPageLayout(`${commonPath}.hbs`, shContent, shObject);
            js = fs.readFileSync(`${commonPath}.js`, 'utf-8');
            pageLayoutJS = requireFromString(js);

        }
        else {
            const objectQuery = `{
                pageLayouts(where:{title:"${pageLayoutName}"}) {
                  html
                  javascript
                }
              }`;

            await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
                let graphQL: any = objectData
                debug(graphQL);
                html = graphQL.pageLayouts.html;
                js = graphQL.pageLayouts.javascript;
                pageLayoutJS = requireFromString(js);

            });
        }
        return await pageLayoutJS.render(shContent, shObject, html);
    };

}