import Debug from 'debug';
import request from 'graphql-request';
import { ShServer } from './ShServer';

const debug = Debug("shio-sdk:ShContext");

export class ShContext {
    private shServer: ShServer;
    private url: string;
    private context: string;
    private siteName: string = null;;
    private format: string;
    private locale: string;
    private objectPath: string;

    public constructor(shServer: ShServer, url: string) {
        let urlArray = url.split("/");
        this.shServer = shServer;
        this.url = url;
        this.context = urlArray[1];
        this.siteName = null;
        this.format = urlArray[3];
        this.locale = urlArray[4];
        this.objectPath = "/" + urlArray.slice(5, urlArray.length).join("/");

        debug("url: " + this.url);
        debug("context: " + this.context);
        debug("siteName: " + this.siteName);
        debug("format: " + this.format);
        debug("locale: " + this.locale);
        debug("objectPath: " + this.objectPath);

    }
    public getUrl(): string {
        return this.url;
    }
    public getContext(): string {
        return this.context;
    }
    public async getSiteName(): Promise<string> {
        if (this.siteName == null) {
            const objectQuery = `{
            shObjectFromURL(url: "${this.getUrl()}") {   
              siteName
            }
          }`;

            await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
                let graphQL: any = objectData
                debug(graphQL);
                this.siteName = graphQL.shObjectFromURL.siteName;
            });
        }
        return this.siteName;
    }


    public getFormat(): string {
        return this.format
    }

    public getLocale(): string {
        return this.locale
    }

    public getObjectPath(): string {
        return this.objectPath
    }

}