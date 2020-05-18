export declare class ShObject {
    constructor();
    navigation(siteName: String, isHome: boolean): {
        id: string;
        name: string;
    }[];
    generateFolderLink: (folderId: String) => String;
}
