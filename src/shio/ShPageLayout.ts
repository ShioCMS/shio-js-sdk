'use strict'
import fs from 'fs';
import cheerio from 'cheerio';
import { request } from 'graphql-request';
import { ShRegion } from './ShRegion';
import { ShServer } from './ShServer';
import { ShContext } from './ShContext';
import Debug from 'debug';

const debug = Debug("shio-sdk:ShPageLayout");

export class ShPageLayout {
    private shServer: ShServer;
    private shContext: ShContext;

    public constructor(shContext: ShContext) {
        this.shServer = shContext.getShServer();
        this.shContext = shContext;
    }

    public async processRegions(html: string, shContent: any, shObject: any) {
        const $ = cheerio.load(html);
        let shContext: ShContext = this.shContext;
        await Promise.all($('[sh-region]').map(async function () {
            var shRegion = $(this);
            var regionName = shRegion.attr("sh-region");
            var region = new ShRegion(shContext, regionName);
            html = await region.render(shContent, shObject);
            shRegion.html(html);
            return html;
        }).get());

        return $.html();
    }

    public async getPageLayoutName(): Promise<string> {
        let pageLayoutName: string;
        const objectQuery = `{
            shObjectFromURL(url: "${this.shContext.getUrl()}") {   
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
        let siteName: string = await this.shContext.getSiteName();
        let directoryPath: string = `${this.shServer.getTemplatePath()}/${siteName.toLowerCase()}/pageLayout/${pageLayoutNameLC}`;
        let html: string = null;
        let js: string = null;
        if (fs.existsSync(directoryPath)) {
            let commonPath: string = `${directoryPath}/${pageLayoutNameLC}`;
            let htmlFile = fs.readFileSync(`${commonPath}.hbs`, 'utf-8');
            html = await this.processRegions(htmlFile, shContent, shObject);
            js = fs.readFileSync(`${commonPath}.js`, 'utf-8');
        }
        else {
            let graphQL: any = null;
            const objectQuery = `{
                pageLayouts(sites:[${siteName}], where:{title:"${pageLayoutName}"}) {
                  html
                  javascript
                }
              }`;

            await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
                graphQL = objectData;
                debug(graphQL);

            });

            html = await this.processRegions(graphQL.pageLayouts[0].html, shContent, shObject);
            let jsModules: string = `
            var Handlebars = require('handlebars'); 
            var forEach = Array.prototype.forEach;`;

            js = jsModules.concat(graphQL.pageLayouts[0].javascript);
        }
        let result = this.renderProcess(shContent, shObject, js, html);
        return result;
    }

    public renderProcess(shContent: any, shObject: any, js: string, html: string): string {
        return eval(js);
    }
}