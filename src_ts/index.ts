// External Dependencies
import * as http from "http";
import {
  defaultHandler,
  deleteHandler,
  getHandler,
  postHandler,
} from "./handlers/handlers";

// Global configuration
const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const reqMethod: string | undefined = req.method;
    const reqUrl: string | undefined = req.url;
    switch (reqMethod) {
      case "GET":
        if (reqUrl === "/") {
          getHandler(req, res, "root");
        } else if (reqUrl !== undefined) {
          const reqUrlArr: Array<string> = reqUrl.split("");
          reqUrlArr.shift();
          const parentDir: string = reqUrlArr.join("");
          getHandler(req, res, parentDir);
        }
        break;

      case "POST":
        if (reqUrl !== undefined) {
          const reqUrlArr: Array<string> = reqUrl.split("/");
          const folderName: string = reqUrlArr.pop() || "xyz";
          reqUrlArr.shift();
          const parentDir: string = reqUrlArr.join("/");
          postHandler(req, res, parentDir, folderName);
        }
        break;

      case "DELETE":
        if (reqUrl !== undefined) {
          const reqUrlArr: Array<string> = reqUrl.split("/");
          const id: string = reqUrlArr.pop() || "";
          deleteHandler(req, res, id);
        }
        break;

      default:
        defaultHandler(req, res);
        break;
    }
  }
);

server.listen(3000, () => {
  console.log("server is running at port 3000.");
});
