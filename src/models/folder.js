"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
// Class Implementation
var Folder = /** @class */ (function () {
    function Folder(name, parent, createdAt, _id) {
        this.name = name;
        this.parent = parent;
        this.createdAt = createdAt;
        this._id = _id;
    }
    return Folder;
}());
exports.Folder = Folder;
