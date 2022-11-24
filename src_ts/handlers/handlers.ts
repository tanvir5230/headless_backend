// External Dependencies
import * as http from "http";
import {
  getFolders,
  createFolder,
  deleteFolder,
} from "../controller/controller";

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
      message: folders ? "Data was retrieved successfully." : "No folder found",
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
      message: status
        ? "Folder was created successfully."
        : "Folder couldn't be created.",
      status,
    })
  );
  res.end();
};

// 4. DELETE handler
export const deleteHandler = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  const status: boolean = await deleteFolder(id);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(
    JSON.stringify({
      message: status
        ? "folder was deleted successfully."
        : "folder couldn't be deleted.",
      status,
    })
  );
  res.end();
};
