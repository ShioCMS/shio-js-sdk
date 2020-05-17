export declare class ShObject {
    navigation(siteName: String, isHome: boolean): {
        id: string;
        name: string;
    }[];
    generateFolderLink: (folderId: String) => String;
}
