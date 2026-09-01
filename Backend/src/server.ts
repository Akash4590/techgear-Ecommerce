import "dotenv/config";

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./config/socket.js";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();