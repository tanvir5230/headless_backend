// External Dependencies
import * as http from "http";
import * as mongoDB from "mongodb";
import { Folder } from "../models/folder";
import { client, root } from "../services/database.services";

// get folder structure
export async function getFolders(parent: string): Promise<mongoDB.Document> {
  try {
    await client.connect();
    const folders: mongoDB.Document = await root
      .find({ parent: parent })
      .toArray();
    return folders;
  } finally {
    await client.close();
  }
}

// Create folder
export const createFolder = async (
  name: string,
  parentDir: string
): Promise<boolean> => {
  await client.connect();
  const folder: Folder = new Folder(name, parentDir);
  try {
    const result = await root.insertOne(folder);
    return result.insertedId ? true : false;
  } finally {
    await client.close();
  }
};
// Delete a folder
export const deleteFolder = async (id: string): Promise<boolean> => {
  try {
    await client.connect();
    const result = await root.deleteOne({ _id: new mongoDB.ObjectId(id) });
    return result.deletedCount > 0;
  } finally {
    await client.close();
  }
};
