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
        var commonPath = `${this.shServer.getTemplatePath()}/region/${this.regionName}/${this.regionName}`;
        var html = fs.readFileSync(`${commonPath}.hbs`, 'utf-8').toString();
        var js = fs.readFileSync(`${commonPath}.js`, 'utf-8').toString();
        var regionJS = requireFromString(js);
        return regionJS.render(shContent, shObject, html);
    };
}
