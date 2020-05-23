'use strict'

import { request } from 'graphql-request'

export class ShContent {
    object
    objectData
    public constructor() {
    }

    public async getContent() {
        const objectQuery = `{
            objectFromURL(url: "/sites/test/default/en-us/sample-blog-post") {   
              id
              type
            }
          }          
          `

        await request('http://localhost:2710/graphql', objectQuery).then(objectData => {
            console.log(objectData.objectFromURL.id);
            console.log(objectData.objectFromURL.type);
            this.objectData = objectData;


        }
        )

        var postQuery = `{
            #postType (where: {id: "#id"}) {
              id
              description
              text
            }
          }
          `.replace("#postType", this.objectData.objectFromURL.type).replace("#id", this.objectData.objectFromURL.id)
        await request('http://localhost:2710/graphql', postQuery).then(postData => {
            console.log(postData);
            this.object = postData.article;
        }
        )
        return {
            system: {
                "id": this.object.id,
            }
        }
    }
}