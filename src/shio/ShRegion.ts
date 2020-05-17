'use strict'
import fs from 'fs';

export class ShRegion {
    regionName: String;

    public constructor(_regionName) {
        this.regionName = _regionName.toLowerCase();
    }

    public async render(shContent, shObject) {
        var html = fs.readFileSync('./src/template/region/' + this.regionName + '/' + this.regionName + '.hbs', 'utf-8').toString();
        var regionJS = require('../template/region/' + this.regionName + '/' + this.regionName);
        return regionJS.render(shContent, shObject, html);
    };
}
