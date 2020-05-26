'use strict'

export class ShObject {
    public constructor() {

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
    public navigation(siteName: string, home: boolean): Array<any> {
        return [
            {
                "id": "123",
                "name": "Folder1",
            },
            {
                "id": "456",
                "name": "Folder2",
            }
        ];
    }

	/**
	 * @desc Returns Folder Navigation Component from Parent Folder
	 * @param folderId
	 *            Folder Id.
	 * @param home
	 *            true or false to show the Home folder.
	 * @public
	 */
    public navigationFolder(folderId: string, home: boolean): string {
        return null;
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
    public generatePostLink(postId: string): string {
        return null;
    }

	/**
	 * @desc Generate Folder Link
	 * @param folderId
	 *            Folder Id.
	 * @public
	 */
    public generateFolderLink(folderId: string): string {
        return "link123";
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
        return null;
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