'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var ShObject = /** @class */ (function () {
    function ShObject() {
        this.generateFolderLink = function (folderId) {
            return "link123";
        };
    }
    ShObject.prototype.navigation = function (siteName, isHome) {
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
    ;
    return ShObject;
}());
exports.ShObject = ShObject;
//# sourceMappingURL=ShObject.js.map