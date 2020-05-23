'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_request_1 = require("graphql-request");
var debug = require('debug')('server');
var ShContent = /** @class */ (function () {
    function ShContent() {
        var objectQuery = "{\n            objectFromURL(url: \"/sites/test/default/en-us/sample-blog-post\") {   \n              id\n              type\n            }\n          }          \n          ";
        graphql_request_1.request('http://localhost:2710/graphql', objectQuery).then(function (data) {
            return debug(data);
        });
        var postQuery = "{\n            article(where: {id: \"7ba3966f-a13d-4268-9a38-364bdd7be9db\"}) {\n              id\n              description\n              text\n            }\n          }\n          ";
        graphql_request_1.request('http://localhost:2710/graphql', postQuery).then(function (data) {
            debug(data);
        });
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