"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
// Class Implementation
var Folder = /** @class */ (function () {
    function Folder(name, parent, createdAt) {
        this.name = name;
        this.parent = parent;
        this.createdAt = createdAt;
        this.name = name;
        this.parent = parent;
        this.createdAt = new Date();
    }
    return Folder;
}());
exports.Folder = Folder;
