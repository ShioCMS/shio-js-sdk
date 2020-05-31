'use strict'

import { request } from 'graphql-request';
import { ShServer } from './ShServer';
import { ShContext } from './ShContext';

export class ShContent {
  private objectData: any;
  private shServer: ShServer;
  private shContext: ShContext;

  public constructor(shServer: ShServer, shContext: ShContext) {
    this.shServer = shServer;
    this.shContext = shContext;
  }

  public async getContent(): Promise<any> {
    const objectQuery = `{
          shObjectFromURL(url: "${this.shContext.getUrl()}") {   
              content
            }
          }`;

    await request(this.shServer.getEndpoint(), objectQuery).then(objectData =>
      this.objectData = objectData
    )

    return this.objectData.shObjectFromURL.content;
  }
}