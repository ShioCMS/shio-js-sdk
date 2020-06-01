'use strict'
import { ShPageLayout } from './ShPageLayout';
import { ShObject } from './ShObject';
import { ShContent } from './ShContent';
import { ShContext } from './ShContext';
import { ShConfig } from './config/ShConfig';
import Debug from 'debug';

const debug = Debug("shio-sdk:ShServer");

export class ShServer {
    private shConfig: ShConfig;


    public constructor() {
        var appRoot = process.cwd();
        this.shConfig = <ShConfig>require(appRoot + '/shioconfig.json');
    }

    public async getPage(url: string): Promise<string> {
        let shContext = new ShContext(this, url);
        if (shContext.getContext() === "sites") {
            let pageLayout = new ShPageLayout(shContext);
            let shObject = new ShObject(this);
            let shContent = new ShContent(shContext);
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
        return this.shConfig.shioServer.endpoint;
    }

    /**
     * getTemplatePath
     */
    public getTemplatePath() {
        if (this.shConfig.app.templatePath === null)
            return "./src/template";
        else
            return this.shConfig.app.templatePath;
    }

    /**
    * getFileServer
    */
    public getFileServer() {
        if (this.shConfig.shioServer.fileServer === null)
            return "http://shio.viglet.net";
        else
            return this.shConfig.shioServer.fileServer;
    }

    /**
    * getAppPort
    */
    public getAppPort() {
        if (this.shConfig.app.port === null)
            return "3001";
        else
            return this.shConfig.app.port;
    }
}