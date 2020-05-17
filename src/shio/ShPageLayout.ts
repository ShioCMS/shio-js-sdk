'use strict'
import fs from 'fs';
import cheerio from 'cheerio';
import { ShRegion } from './ShRegion';

export class ShPageLayout {
    pageLayoutName: String;

    constructor(_pageLayoutName) {
        this.pageLayoutName = _pageLayoutName.toLowerCase();
    }

    public async readPageLayout(filePath, shContent, shObject) {
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

    public async render(shContent, shObject) {
        var html = await this.readPageLayout('./src/template/pageLayout/' + this.pageLayoutName + '/' + this.pageLayoutName + '.hbs', shContent, shObject);
        var pageLayoutJS = require('../template/pageLayout/' + this.pageLayoutName + '/' + this.pageLayoutName);
        return pageLayoutJS.render(shContent, shObject, html);
    };
}