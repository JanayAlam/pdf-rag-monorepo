import http from "node:http";
import app from "./app";
import { PORT } from "./settings/config";

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
