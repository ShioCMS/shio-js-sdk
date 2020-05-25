'use strict'
import { ShPageLayout } from './ShPageLayout';
import { ShObject } from './ShObject';
import { ShContent } from './ShContent';
import Debug from 'debug';

const debug = Debug("shio-sdk:ShServer");

export class ShServer {
    private endpoint: string

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public async getPage(url: string): Promise<string> {
        var urlArray = url.split("/");
        var context = urlArray[1];
        var siteName = urlArray[2];
        var format = urlArray[3];
        var locale = urlArray[4];
        var objectPath = "/" + urlArray.slice(5, urlArray.length).join("/");

        debug("context: " + context);
        debug("siteName: " + siteName);
        debug("format: " + format);
        debug("locale: " + locale);
        debug("objectPath: " + objectPath);

        if (context === "sites") {
            var pageLayout = new ShPageLayout(this, url);
            var shObject = new ShObject();
            let shContent = new ShContent(this);
            let content = await shContent.getContent(url);
            return await pageLayout.render(content, shObject);
        }
        else {
            return "";
        }
    }
    /**
     * getEndpoint
     */
    public getEndpoint() {
        return this.endpoint;
    }
}