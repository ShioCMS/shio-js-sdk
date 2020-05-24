'use strict'

import { request } from 'graphql-request';
import { ShServer } from './ShServer';
import { ShContentObj } from './content/ShContentObj';
import { ShContentSystem } from './content/ShContentSystem';
import { ShContentSite } from './content/ShContentSite';
import { ShContentSiteSystem } from './content/ShContentSiteSystem';

export class ShContent {
  private object: any;
  private objectData: any;
  private shServer: ShServer;

  public constructor(shServer: ShServer) {
    this.shServer = shServer;
  }

  public async getContent(): Promise<ShContentObj> {
    const objectQuery = `{
            objectFromURL(url: "/sites/test/default/en-us/sample-blog-post") {   
              id
              type
            }
          }`;

    await request(this.shServer.getUrl(), objectQuery).then(objectData => {
      console.log(objectData.objectFromURL.id);
      console.log(objectData.objectFromURL.type);
      this.objectData = objectData;


    })

    var postQuery = `{
            #postType (where: {id: "#id"}) {
              id
              description
              text
            }
          }`.replace("#postType", this.objectData.objectFromURL.type).replace("#id", this.objectData.objectFromURL.id);

    await request(this.shServer.getUrl(), postQuery).then(postData => {
      console.log(postData);
      this.object = postData.article;
    })

    
    let contentObj = ShContentObj.create({TITLE: "Ale"});
    contentObj.site = new ShContentSite();
    contentObj.site.system = new ShContentSiteSystem();
    contentObj.system = new ShContentSystem();
    contentObj.system.id = this.object.id;

    return contentObj;
  }
}