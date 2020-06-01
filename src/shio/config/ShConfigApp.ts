import Debug from 'debug';

const debug = Debug("shio-sdk:ShioConfigApp");

export class ShConfigApp {
    public port: BigInteger;

    public templatePath: string;

    public sites: Array<string>;

    public format: string;

    public locale: string;

    public hasContext: boolean;

    public hasFormat: boolean;

    public hasLocale: boolean;

    public hasSiteName: boolean;

    constructor(port: BigInteger, templatePath: string, sites: Array<string>, format: string, locale: string, hasContext: boolean, hasFormat: boolean, hasLocale: boolean, hasSiteName: boolean) {
        this.port = port;

        this.templatePath = templatePath;
        
        this.sites = sites;

        this.format = format;

        this.locale = locale;

        this.hasContext = hasContext;

        this.hasFormat = hasFormat;

        this.hasLocale = hasLocale;

        this.hasSiteName = hasSiteName;

    }
}