'use strict'

export class ShObject {

    public navigation(siteName: String, isHome: boolean) {
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

    public generateFolderLink = function (folderId: String): String {
        return "link123";
    };
}