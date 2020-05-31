'use strict'
import { ShPageLayout } from './ShPageLayout';
import { ShObject } from './ShObject';
import { ShContent } from './ShContent';
import { ShContext } from './ShContext';
import Debug from 'debug';


const debug = Debug("shio-sdk:ShServer");

export class ShServer {
    private endpoint: string;

    private templatePath: string = "./src/template/viglet";

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public async getPage(url: string): Promise<string> {
        let shContext = new ShContext(url);
        if (shContext.getContext() === "sites") {
            let pageLayout = new ShPageLayout(this, shContext);
            let shObject = new ShObject(this);
            let shContent = new ShContent(this, shContext);
            let content = await shContent.getContent();
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

    /**
     * setTemplatePath
     */
    public setTemplatePath(templatePath: string) {
        this.templatePath = templatePath;
    }

    /**
     * getTemplatePath
     */
    public getTemplatePath() {
        return this.templatePath;
    }
}