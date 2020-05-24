'use strict'
import fs from 'fs';
import requireFromString from 'require-from-string';

export class ShRegion {
    private regionName: string;

    public constructor(_regionName: string) {
        this.regionName = _regionName.toLowerCase();
    }

    public getRegionName(): string {
        return this.regionName;
    }
    public async render(shContent: any, shObject: any): Promise<string> {
        var commonPath = `./src/template/region/${this.regionName}/${this.regionName}`;
        var html = fs.readFileSync(`${commonPath}.hbs`, 'utf-8').toString();
        var js = fs.readFileSync(`${commonPath}.js`, 'utf-8').toString();
        var regionJS = requireFromString(js);
        return regionJS.render(shContent, shObject, html);
    };
}
