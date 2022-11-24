// External Dependencies
import * as http from "http";
import * as mongoDB from "mongodb";
import { Folder } from "../models/folder";
import { client, root } from "../services/database.services";

// get folder structure
export async function getFolders(parent: string): Promise<mongoDB.Document> {
  try {
    const folders: mongoDB.Document = await root
      .find({ parent: parent })
      .toArray();
    return folders;
  } finally {
    await client.close();
  }
}

export const createFolder = async (
  name: string,
  parentDir: string
): Promise<boolean> => {
  const folder: Folder = new Folder(name, parentDir);
  try {
    const result = await root.insertOne(folder);
    return result.insertedId ? true : false;
  } finally {
    await client.close();
  }
};

// handlers
// 1. default handlers
export const defaultHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(
    JSON.stringify({
      message: `API not found at ${req.url}`,
    })
  );
  res.end();
};

// 2. get operation Handler
export const getHandler = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  parentDir: string
) => {
  const folders = await getFolders(parentDir);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(
    JSON.stringify({
      message: "Data was retrieved successfully.",
      data: folders,
    })
  );
  res.end();
};

// 3. POST handler
export const postHandler = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  parentDir: string,
  name: string
) => {
  const status: boolean = await createFolder(name, parentDir);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(
    JSON.stringify({
      message: "Data was retrieved successfully.",
      status,
    })
  );
  res.end();
};
