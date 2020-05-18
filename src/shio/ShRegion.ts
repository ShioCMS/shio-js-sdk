'use strict'
import fs from 'fs';
import requireFromString from 'require-from-string';

export class ShRegion {
    regionName: String;

    public constructor(_regionName) {
        this.regionName = _regionName.toLowerCase();
    }

    public async render(shContent, shObject) {
        var html = fs.readFileSync('./src/template/region/' + this.regionName + '/' + this.regionName + '.hbs', 'utf-8').toString();
        var js = fs.readFileSync('./src/template/region/' + this.regionName + '/' + this.regionName + '.js', 'utf-8').toString();
        var regionJS = requireFromString(js);
        return regionJS.render(shContent, shObject, html);
    };
}
