import { Server } from "socket.io";

let io: Server | null = null;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-user-room", (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`User joined room: user:${userId}`);
    });

    socket.on("join-admin-room", () => {
      socket.join("admins");
      console.log("Admin joined room");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
};