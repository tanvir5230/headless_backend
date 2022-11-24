// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export class Folder {
    constructor(public name: string, public parent: string, public createdAt: Date, public _id?: ObjectId) {}
}