'use strict'
import fs from 'fs';
import requireFromString from 'require-from-string';
import { ShServer } from './ShServer';

export class ShRegion {
    private regionName: string;
    private shServer: ShServer;
    public constructor(shServer: ShServer, regionName: string) {
        this.regionName = regionName.toLowerCase();
        this.shServer = shServer;
    }

    public getRegionName(): string {
        return this.regionName;
    }
    public async render(shContent: any, shObject: any): Promise<string> {
        let commonPath: string = `${this.shServer.getTemplatePath()}/region/${this.regionName}/${this.regionName}`;
        let html: string = fs.readFileSync(`${commonPath}.hbs`, 'utf-8');
        let js: string = fs.readFileSync(`${commonPath}.js`, 'utf-8')
        let regionJS: any = requireFromString(js);
        return await regionJS.render(shContent, shObject, html);
    };
}
