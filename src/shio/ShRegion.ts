'use strict'
import fs from 'fs';
import { request } from 'graphql-request';
import { ShServer } from './ShServer';
import { ShContext } from './ShContext';
import Debug from 'debug';

const debug = Debug("shio-sdk:ShRegion");
export class ShRegion {
    private regionName: string;
    private shServer: ShServer;
    private shContext: ShContext;

    public constructor(shServer: ShServer, shContext: ShContext, regionName: string) {
        this.shServer = shServer;
        this.shContext = shContext;
        this.regionName = regionName;
    }

    public getRegionName(): string {
        return this.regionName;
    }
    public async render(shContent: any, shObject: any): Promise<string> {
        let regionName: string = this.getRegionName();
        let regionNameLC: string = regionName.toLowerCase();
        let directoryPath: string = `${this.shServer.getTemplatePath()}/region/${regionNameLC}`;
        let html: string = null;
        let js: string = null;
        if (fs.existsSync(directoryPath)) {
            let commonPath: string = `${directoryPath}/${regionNameLC}`;
            html = fs.readFileSync(`${commonPath}.hbs`, 'utf-8');
            js = fs.readFileSync(`${commonPath}.js`, 'utf-8');
        }
        else {
            let graphQL: any = null;
            let siteName: string = await this.shContext.getSiteName();  
            const objectQuery = `{
                regions(sites:[${siteName}], where:{title:"${regionName}"}) {
                  html
                  javascript
                }
              }`;
            await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
                graphQL = objectData;
                debug(graphQL);
            });
            html = graphQL.regions[0].html;
            let jsModules: string = `
            var Handlebars = require('handlebars'); 
            var forEach = Array.prototype.forEach;`;

            js = jsModules.concat(graphQL.regions[0].javascript);
            debug(js);
        }
        return this.renderProcess(shContent, shObject, js, html);
    };

    public renderProcess(shContent: any, shObject: any, js: string, html: string): string {
        return eval(js);
    }
}
