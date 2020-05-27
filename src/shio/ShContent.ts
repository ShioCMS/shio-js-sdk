'use strict'

import { request } from 'graphql-request';
import { ShServer } from './ShServer';

export class ShContent {
  private objectData: any;
  private shServer: ShServer;

  public constructor(shServer: ShServer) {
    this.shServer = shServer;
  }

  public async getContent(url: string): Promise<any> {
    const objectQuery = `{
          shObjectFromURL(url: "${url}") {   
              content
            }
          }`;

    await request(this.shServer.getEndpoint(), objectQuery).then(objectData =>
      this.objectData = objectData
    )

    return this.objectData.shObjectFromURL.content;
  }
}