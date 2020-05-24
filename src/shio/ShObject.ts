'use strict'

export class ShObject {
    public constructor() {
    
    }

    public navigation(siteName: string, isHome: boolean): Array<any> {
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
    };

    public generateFolderLink = function (folderId: string): string {
        return "link123";
    };
}