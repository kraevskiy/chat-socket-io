import { createContext, useContext, useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store.ts";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  onlineUsers: []
});

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      const socket = io(import.meta.env.MODE === "development" ? "http://localhost:8000" : "https://chat-socket-io-prod.onrender.com", {
        query: {
          userId: user._id
        }
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };

  }, [user]);

  return (
    <SocketContext.Provider value={{
      socket,
      onlineUsers
    }}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocketContext = () => useContext(SocketContext);
