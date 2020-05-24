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
            objectFromURL(url: "${url}") {   
              content
            }
          }`;

    await request(this.shServer.getUrl(), objectQuery).then(objectData =>
      this.objectData = objectData
    )

    return this.objectData.objectFromURL.content;
  }
}