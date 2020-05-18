'use strict'
import fs from 'fs';
import cheerio from 'cheerio';
import requireFromString from 'require-from-string'
import { ShRegion } from './ShRegion';

export class ShPageLayout {
    pageLayoutName: String;

    public constructor(_pageLayoutName) {
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
            console.log("AA");
        }        
        $('[sh-region]').each(cheerioEach);
        console.log("BB");
        await Promise.all(promises);
        console.log("CC");
        return $.html();

    }
    
    public test(value) {
        return value;
    }
    
    public async render(shContent, shObject) {
        var html = await this.readPageLayout('./src/template/pageLayout/' + this.pageLayoutName + '/' + this.pageLayoutName + '.hbs', shContent, shObject);
        var js = fs.readFileSync('./src/template/pageLayout/' + this.pageLayoutName + '/' + this.pageLayoutName + '.js', 'utf-8').toString();        
        var pageLayoutJS = requireFromString(js);
        return pageLayoutJS.render(shContent, shObject, html);
    };
}
