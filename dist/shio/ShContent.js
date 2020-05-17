'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_request_1 = require("graphql-request");
var ShContent = /** @class */ (function () {
    function ShContent(_regionName) {
        var query = "{\n            articles(where: {_furl: \"new-feature\"}) {\n              id\n              _furl\n              text\n              \n            }\n          }\n          ";
        this.regionName = _regionName.toLowerCase();
        graphql_request_1.request('https://shio.viglet.net/graphql', query).then(function (data) {
            return console.log(data.articles[0].id);
        });
    }
    ShContent.prototype.getContent = function () {
        return {
            system: {
                "id": "id",
            },
            test: "test"
        };
    };
    return ShContent;
}());
exports.ShContent = ShContent;
//# sourceMappingURL=ShContent.js.map