'use strict'
import { ShServer } from './ShServer';
import { request } from 'graphql-request';
import Debug from 'debug';
import deasync from 'deasync';

const debug = Debug("shio-sdk:ShObject");
export class ShObject {
	private shServer: ShServer;

	public constructor(shServer: ShServer) {
		this.shServer = shServer;
	}

	public formComponent(shPostTypeName: string, shObjectId: string): string {
		return null;
	}

	/**
	 * @desc Returns Search Result
	 * @public
	 */
	public searchComponent(): string {
		return null;
	}

	/**
	 * @desc Returns Folder Navigation Component
	 * @param siteName
	 *            Site Name.
	 * @param home
	 *            true or false to show the Home folder.
	 * @public
	 */

	public navigation(siteName: string, home: boolean): any {
		let done: boolean = false;
		let returnData: any = null;

		this.navigationAsync(siteName, home).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async navigationAsync(siteName: string, home: boolean): Promise<any> {
		let folders: any;
		const objectQuery = `{
            shNavigation(siteName: "${siteName}", isHome: ${home}) {   
              folders
            }
          }`;


		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			folders = graphQL.shNavigation.folders;
		});

		return folders;
	}

	/**
	 * @desc Returns Folder Navigation Component from Parent Folder
	 * @param folderId
	 *            Folder Id.
	 * @param home
	 *            true or false to show the Home folder.
	 * @public
	 */

	public navigationFolder(folderId: string, home: boolean): any {
		let done: boolean = false;
		let returnData: any = null;

		this.navigationFolderAsync(folderId, home).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async navigationFolderAsync(folderId: string, home: boolean): Promise<any> {
		let folders: any;
		const objectQuery = `{
            shNavigation(folderId: "${folderId}", isHome: "${home}") {   
              folders
            }
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			folders = graphQL.shNavigation.folders;
		});

		return folders;
	}

	/**
	 * @desc Returns Query Component
	 * @param folderId
	 *            Folder Id.
	 * @param postTypeName
	 *            Post Type Name.
	 * @public
	 */
	public query(folderId: string, postTypeName: string): any {
		let done: boolean = false;
		let returnData: any = null;

		this.queryAsync(folderId, postTypeName).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}
	public async queryAsync(folderId: string, postTypeName: string): Promise<any> {
		let posts: Array<any> = [];
		const objectQuery = `{
            shQuery(postTypeName:"${postTypeName}", folderId:"${folderId}") {
				post
			}
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			graphQL.shQuery.forEach((item: any) => {
				posts.push(item.post);
			});
		});

		return posts;
	}

	/**
	 * @desc Returns Query Component
	 * @param postTypeName
	 *            Post Type Name.         
	 * @public
	 */

	public queryByPostType(postTypeName: string): any {
		let done: boolean = false;
		let returnData: any = null;

		this.queryByPostTypeAsync(postTypeName).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async queryByPostTypeAsync(postTypeName: string): Promise<any> {
		let posts: Array<any> = [];
		const objectQuery = `{
            shQuery(postTypeName:"${postTypeName}") {
				post
			}
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			graphQL.shQuery.forEach((item: any) => {
				posts.push(item.post);
			});
		});
		debug(posts);

		return posts;
	}

	/**
	 * @desc Returns Query Component
	 * @param postTypeName
	 *            Post Type Name.
	 * @param postAttrName
	 *            Post Type Attribute Name.
	 * @param arrayValue
	 *            Array Value.            
	 * @public
	 */

	public queryByPostTypeIn(postTypeName: string, postAttrName: string, arrayValue: Array<string>): any {
		let done: boolean = false;
		let returnData: any = null;

		this.queryByPostTypeInAsync(postTypeName, postAttrName, arrayValue).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async queryByPostTypeInAsync(postTypeName: string, postAttrName: string, arrayValue: Array<string>): Promise<any> {
		let posts: Array<any> = [];
		const objectQuery = `{
            shQuery(postTypeName:"${postTypeName}", postAttrName: "${postAttrName}", arrayValue: ${arrayValue}) {
				post
			}
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			graphQL.shQuery.forEach((item: any) => {
				posts.push(item.post);
			});
		});

		return posts;
	}

	/**
	 * @desc Returns getRelation Component
	 * @param shPostAttrId,
	 *            Post Attribute Id.
	 * @public
	 */
	public getRelation(shPostAttrId: string): string {
		return null;
	}

	/**
	 * @desc Generate Post Link
	 * @param postId
	 *            Post Id.
	 * @public
	 */

	public generatePostLink(postId: string): string {
		let done: boolean = false;
		let returnData: string = null;

		this.generatePostLinkAsync(postId).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async generatePostLinkAsync(postId: string): Promise<string> {
		return await this.generateObjectLink(postId);
	}

	/**
	 * @desc Generate Folder Link
	 * @param folderId
	 *            Folder Id.
	 * @public
	 */
	public generateFolderLink(folderId: string): string {
		let done: boolean = false;
		let returnData: string = null;

		this.generateFolderLinkAsync(folderId).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });

		return returnData;
	}

	public async generateFolderLinkAsync(folderId: string): Promise<string> {
		return await this.generateObjectLink(folderId);
	}

	/**
	 * @desc Get Post Map
	 * @param postId
	 *            Post Id.
	 * @public
	 */
	public getPost(postId: string): string {
		return null;
	}

	/**
	 * @desc Get Folder Map
	 * @param folderId,
	 *            Folder Id.
	 * @public
	 */
	public getFolderMap(folderId: string): string {
		return null;
	}

	/**
	 * @desc Get Parent Folder Map
	 * @param folderId
	 *            Folder Id.
	 * @public
	 */
	public getParentFolder(folderId: string): string {
		return null;
	}
	/**
	 * @desc Generate Object Link
	 * @param objectId
	 *            Object Id.
	 * @public
	 */

	public generateObjectLink(objectId: string): string {
		let done: boolean = false;
		let returnData: string = null;

		this.generateObjectLinkAsync(objectId).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}
	public async generateObjectLinkAsync(objectId: string): Promise<string> {
		let url: string;
		const objectQuery = `{
			shObjectURL(objectId:"${objectId}") {
				url
			  }
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			url = graphQL.shObjectURL.url;
		});

		return url;
	}

	/**
	 * @desc Generate Image Link
	 * @param objectId
	 *            Object Id.
	 * @param scale
	 *            scale.
	 * @public
	 */

	public generateImageLink(objectId: string, scale: number): string {
		let done: boolean = false;
		let returnData: string = null;

		this.generateImageLinkAsync(objectId, scale).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async generateImageLinkAsync(objectId: string, scale: number): Promise<string> {
		let url: string;
		const objectQuery = `{
			shObjectURL(objectId: "${objectId}", scale: ${scale}) {
				url
			  }
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			url = graphQL.shObjectURL.url;
		});

		return url;
	}

	public getObjectFromURL(url: string): any {
		let done: boolean = false;
		let returnData: any = null;

		this.getObjectFromURL(url).then(function (data) {
			returnData = data;
			done = true;
		})

		deasync.loopWhile(function () { return !done; });
		return returnData;
	}

	public async getObjectFromURLAsync(url: string): Promise<any> {
		let object: any;
		const objectQuery = `{
			shObjectFromURL(url:"${url}"){
			  id,
			  content,
			  context,
			  format,
			  locale,    
			  pageLayout,
			  siteId,
			  siteName,
			  type
			  
			}
		  }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			let graphQL: any = objectData
			debug(graphQL);
			object = graphQL.shObjectFromURL;
		});

		return object;
	}
}