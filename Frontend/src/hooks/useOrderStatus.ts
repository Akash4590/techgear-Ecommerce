import { useEffect, useState } from "react";
import { getSocket } from "../config/socket";
import { useAuth } from "../context/AuthContext";

interface OrderStatusUpdate {
  orderId: string;
  status: string;
  updatedAt: string;
}

export const useOrderStatus = (orderId: string, initialStatus: string) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (!user?.id) return;

    const socket = getSocket();
    socket.connect();

    // Apne user room mein join ho jao — backend isi room pe events bhejta hai
    socket.emit("join-user-room", user.id);

    const handleStatusUpdate = (data: OrderStatusUpdate) => {
      // Sirf isi order ka update lo, baaki ignore karo
      if (data.orderId === orderId) {
        setStatus(data.status);
      }
    };

    socket.on("order-status-updated", handleStatusUpdate);

    return () => {
      socket.off("order-status-updated", handleStatusUpdate);
    };
  }, [user?.id, orderId]);

  return status;
};