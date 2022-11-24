// External Dependencies
import * as http from "http";

// Global configuration
const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
      case "GET":
        if (req.url == "/") {
          try {
            
          } finally {
          }
        }

        break;

      default:
        break;
    }
  }
);
server.listen(3000, () => {
  console.log("server is running at port 3000.");
});
