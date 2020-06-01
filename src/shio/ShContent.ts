'use strict'

import { request } from 'graphql-request';
import { ShContext } from './ShContext';

export class ShContent {
  private objectData: any;
  private shContext: ShContext;

  public constructor(shContext: ShContext) {
    this.shContext = shContext;
  }

  public async getContent(): Promise<any> {
    const objectQuery = `{
          shObjectFromURL(url: "${this.shContext.getUrl()}") {   
              content
            }
          }`;

    await request(this.shContext.getShServer().getEndpoint(), objectQuery).then(objectData =>
      this.objectData = objectData
    )

    return this.objectData.shObjectFromURL.content;
  }
}