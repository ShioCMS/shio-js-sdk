'use strict'
import { ShServer } from './ShServer';
import { request } from 'graphql-request';
import Debug from 'debug';

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
	public async navigation(siteName: string, home: boolean): Promise<any> {
		let folders: any;
		const objectQuery = `{
            shNavigation(siteName: "${siteName}", isHome: ${home}) {   
              folders
            }
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			debug(objectData);
			folders = objectData.shNavigation.folders;
		}
		)
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
	public async navigationFolder(folderId: string, home: boolean): Promise<any> {
		let folders: any;
		const objectQuery = `{
            shNavigation(folderId: "${folderId}", isHome: "${home}") {   
              folders
            }
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			debug(objectData);
			folders = objectData.shNavigation.folders;
		}
		)
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

	public query(folderId: string, postTypeName: boolean): string {
		return null;
	}

	/**
	 * @desc Returns Query Component
	 * @param postTypeName
	 *            Post Type Name.         
	 * @public
	 */
	public queryByPostType(postTypeName: string): string {
		return null;
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
	public queryByPostTypeIn(postTypeName: string, postAttrName: string, arrayValue: string): string {
		return null;
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
	public async generatePostLink(postId: string): Promise<string> {
		return await this.generateObjectLink(postId);
	}

	/**
	 * @desc Generate Folder Link
	 * @param folderId
	 *            Folder Id.
	 * @public
	 */
	public async generateFolderLink(folderId: string): Promise<string> {
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
	public async generateObjectLink(objectId: string): Promise<string> {
		let url: string;
		const objectQuery = `{
			shObjectURL(objectId:"${objectId}") {
				url
			  }
          }`;

		await request(this.shServer.getEndpoint(), objectQuery).then(objectData => {
			debug(objectData);
			url = objectData.shObjectURL.url;
		}
		)
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
	public generateImageLink(objectId: string, scale: string): string {
		return null;
	}
}