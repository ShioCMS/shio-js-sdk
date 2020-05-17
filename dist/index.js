"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShRegion_1 = require("./shio/ShRegion");
var ShContent_1 = require("./shio/ShContent");
var ShObject_1 = require("./shio/ShObject");
var ShPageLayout_1 = require("./shio/ShPageLayout");
exports.shContent = function () {
    var shContent = new ShContent_1.ShContent("region").getContent();
    return shContent;
};
exports.shObject = function () {
    return ShObject_1.ShObject;
};
exports.shRegion = function () {
    return ShRegion_1.ShRegion;
};
exports.shPageLayout = function () {
    return ShPageLayout_1.ShPageLayout;
};
//# sourceMappingURL=index.js.map