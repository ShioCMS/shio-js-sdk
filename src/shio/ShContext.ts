import Debug from 'debug';

const debug = Debug("shio-sdk:ShContext");

export class ShContext {
    private url: string;
    private context: string;
    private siteName: string;
    private format: string;
    private locale: string;
    private objectPath: string;

    public constructor(url: string) {
        let urlArray = url.split("/");
        this.url = url;
        this.context = urlArray[1];
        this.siteName = urlArray[2].charAt(0).toUpperCase() + urlArray[2].slice(1);
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

    public getSiteName(): string {
        return this.siteName
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