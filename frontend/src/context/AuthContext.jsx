import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [selectedUser, setSelectedUser] = useState(JSON.parse(localStorage.getItem("selected-chat-user")) || null);

  // Sync selected user with local storage
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selected-chat-user", JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem("selected-chat-user");
    }
  }, [selectedUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, selectedUser, setSelectedUser }}>
      {children}
    </AuthContext.Provider>
  );
};