'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var ShContent = /** @class */ (function () {
    function ShContent() {
        var query = "{\n            articles(where: {_furl: \"new-feature\"}) {\n              id\n              _furl\n              text\n              \n            }\n          }\n          ";
        //    request('https://shio.viglet.net/graphql', query).then(data =>
        //       console.log(data.articles[0].id)
        //    )
    }
    ShContent.prototype.getContent = function () {
        return {
            system: {
                "id": "id",
            }
        };
    };
    return ShContent;
}());
exports.ShContent = ShContent;
//# sourceMappingURL=ShContent.js.map