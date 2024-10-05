import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { io } from 'socket.io-client'
import socketio from 'socket.io-client'
import { useAuthContext } from '../authSlice'

interface SocketContextType {
  socket: ReturnType<typeof socketio> | null
}

const SocketContext = createContext<SocketContextType>({
  socket: null
})

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null)
  const { userData } = useAuthContext()
  // console.log(socket)
  useEffect(() => {
    if (userData?._id) {
      const socketInstance = io(import.meta.env.VITE_SOCKET_URL)
      setSocket(socketInstance)

      return () => {
        socketInstance?.close()
      }
    }
  }, [userData?._id])

  useEffect(() => {
    socket?.emit('setup', { userId: userData._id })
  }, [socket, userData?._id])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

const useSocketContext = () => useContext(SocketContext)

export { SocketContextProvider, useSocketContext }
