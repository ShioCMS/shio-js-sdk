export declare class ShPageLayout {
    pageLayoutName: String;
    constructor(_pageLayoutName: any);
    readPageLayout(filePath: any, shContent: any, shObject: any): Promise<any>;
    test(value: any): any;
    render(shContent: any, shObject: any): Promise<any>;
}
