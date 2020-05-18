'use strict'

import { request } from 'graphql-request'

export class ShContent {
    public constructor() {
        const query = `{
            articles(where: {_furl: "new-feature"}) {
              id
              _furl
              text
              
            }
          }
          `
    //    request('https://shio.viglet.net/graphql', query).then(data =>
    //       console.log(data.articles[0].id)
    //    )
    }

    public getContent() {
        return {
            system: {
                "id": "id",
            }
        }
    }
}