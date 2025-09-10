import {io} from 'socket.io-client'
import {useState,useEffect,useContext,createContext} from 'react'
import { useAuthContext } from './AuthContext'

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineusers, setOnlineUsers] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    if(authUser){
      const socket = io("http://localhost:5001",{
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // listen for online users
      socket.on("getOnlineUsers",(users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if(socket) {
        socket.close();
        setSocket(null);
      }
    }
  },[authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineusers}}>
      {children}
    </SocketContext.Provider>
  );
}