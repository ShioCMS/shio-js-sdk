'use strict'

export class ShServer {
    private url: string

    public constructor(url: string) {
        this.url = url;
    }
    
    /**
     * getUrl
     */
    public getUrl() {
        return this.url;
    }
}