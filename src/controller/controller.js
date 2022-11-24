"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = exports.defaultHandler = exports.createFolder = exports.getFolders = void 0;
var folder_1 = require("../models/folder");
var database_services_1 = require("../services/database.services");
// get folder structure
function getFolders(parent) {
    return __awaiter(this, void 0, void 0, function () {
        var folders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 2, 4]);
                    return [4 /*yield*/, database_services_1.root
                            .find({ parent: parent })
                            .toArray()];
                case 1:
                    folders = _a.sent();
                    return [2 /*return*/, folders];
                case 2: return [4 /*yield*/, database_services_1.client.close()];
                case 3:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getFolders = getFolders;
var createFolder = function (name, parentDir) { return __awaiter(void 0, void 0, void 0, function () {
    var folder, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                folder = new folder_1.Folder(name, parentDir);
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 5]);
                return [4 /*yield*/, database_services_1.root.insertOne(folder)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result.insertedId ? true : false];
            case 3: return [4 /*yield*/, database_services_1.client.close()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createFolder = createFolder;
// handlers
// 1. default handlers
var defaultHandler = function (req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.write(JSON.stringify({
        message: "API not found at " + req.url,
    }));
    res.end();
};
exports.defaultHandler = defaultHandler;
// 2. get operation Handler
var getHandler = function (req, res, parentDir) { return __awaiter(void 0, void 0, void 0, function () {
    var folders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFolders(parentDir)];
            case 1:
                folders = _a.sent();
                res.writeHead(200, {
                    "Content-Type": "application/json",
                });
                res.write(JSON.stringify({
                    message: "Data was retrieved successfully.",
                    data: folders,
                }));
                res.end();
                return [2 /*return*/];
        }
    });
}); };
exports.getHandler = getHandler;
// 3. POST handler
var postHandler = function (req, res, parentDir, name) { return __awaiter(void 0, void 0, void 0, function () {
    var status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.createFolder(name, parentDir)];
            case 1:
                status = _a.sent();
                res.writeHead(200, {
                    "Content-Type": "application/json",
                });
                res.write(JSON.stringify({
                    message: "Data was retrieved successfully.",
                    status: status,
                }));
                res.end();
                return [2 /*return*/];
        }
    });
}); };
exports.postHandler = postHandler;
