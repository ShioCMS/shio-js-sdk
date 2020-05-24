'use strict'
import fs from 'fs';
import cheerio from 'cheerio';
import requireFromString from 'require-from-string'
import { ShRegion } from './ShRegion';

export class ShPageLayout {
    private pageLayoutName: string;

    public constructor(_pageLayoutName: string) {
        this.pageLayoutName = _pageLayoutName.toLowerCase();
    }

    public async readPageLayout(filePath: string, shContent: any, shObject: any) {
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
    
    public getPageLayoutName(): string {
        return this.pageLayoutName;
    }
    
    public async render(shContent: any, shObject: any): Promise<string> {
        var commonPath = `./src/template/pageLayout/${this.pageLayoutName}/${this.pageLayoutName}`;
        var html = await this.readPageLayout(`${commonPath}.hbs`, shContent, shObject);
        var js = fs.readFileSync(`${commonPath}.js`, 'utf-8').toString();        
        var pageLayoutJS = requireFromString(js);
        return pageLayoutJS.render(shContent, shObject, html);
    };
}
