import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, selectedUser, setSelectedUser }}>
      {children}
    </AuthContext.Provider>
  );
};