'use strict'
import fs from 'fs';
import cheerio from 'cheerio';
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

    public async processRegions(html: string, shContent: any, shObject: any) {
        const $ = cheerio.load(html);
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
            let htmlFile = fs.readFileSync(`${commonPath}.hbs`, 'utf-8');
            html = await this.processRegions(htmlFile, shContent, shObject);
            js = fs.readFileSync(`${commonPath}.js`, 'utf-8');
        }
        else {
            let graphQL: any = null;
            const objectQuery = `{
                pageLayouts(where:{title:"${pageLayoutName}"}) {
                  html
                  javascript
                }
              }`;

            await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
                graphQL = objectData;
                debug(graphQL);

            });

            html = await this.processRegions(graphQL.pageLayouts[0].html, shContent, shObject);
            js = "var Handlebars = require('handlebars'); " + graphQL.pageLayouts[0].javascript;
        }
        let result = await this.renderProcess(shContent, shObject, js, html);
        return result;
    };


    public async renderProcess(shContent: any, shObject: any, js: string, html: string): Promise<string> {
        return await eval(js);
    }
}