'use strict'

import { request } from 'graphql-request'

export class ShContent {
    regionName: String;
    constructor(_regionName) {
        const query = `{
            articles(where: {_furl: "new-feature"}) {
              id
              _furl
              text
              
            }
          }
          `
        this.regionName = _regionName.toLowerCase();
        request('https://shio.viglet.net/graphql', query).then(data =>
            console.log(data.articles[0].id)
        )
    }

    public getContent() {
        return {
            system: {
                "id": "id",
            },
            test : "test"
        }
    }
}