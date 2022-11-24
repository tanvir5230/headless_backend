// Class Implementation
export class Folder {
  constructor(
    public name: string,
    public parent: string,
    public createdAt?: Date
  ) {
    this.name = name;
    this.parent = parent;
    this.createdAt = new Date();
  }
}
