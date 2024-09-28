import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io,Socket } from "socket.io-client";
import { useAuthContext } from "./authSlice";


interface SocketContextType {
  socket: Socket | null;
}

const socketContext = createContext<SocketContextType>({ socket: null });

const SocketContextProvider = ({ children }:{children:ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData) {
      const socketInstance = io(import.meta.env.VITE_SOCKET_URL);
      setSocket(socketInstance);

      return () => {
        socketInstance?.close();
      };
    } else {
      if (socket) {
        socket?.close();
        setSocket(null);
      }
    }
  }, [socket,userData]);

  useEffect(() => {
    if (socket && userData?._id) {
      socket.emit("setup", { userId: userData._id });
    }
  }, [socket,userData]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

const useSocketContext = () => useContext(socketContext);

export { SocketContextProvider, useSocketContext };