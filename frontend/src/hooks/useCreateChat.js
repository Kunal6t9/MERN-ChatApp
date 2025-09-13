import { useState, useEffect } from "react";
import API from "../services/api.js";
import { useAuthContext } from "../context/AuthContext";

const useCreateChat = () => {
  const [chatId, setChatId] = useState(null);
  const { authUser, selectedUser } = useAuthContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getOrCreateChat = async () => {
      // Clear chatId when no user is selected
      if (!selectedUser) {
        setChatId(null);
        return;
      }
      
      // CRITICAL CHECK: Ensure both user IDs are valid strings
      if (!authUser || !authUser._id || !selectedUser._id) {
          console.error("User IDs are missing. Aborting chat creation.");
          return;
      }
      
      // Log the IDs to confirm they are present
      console.log("Logged-in user ID:", authUser._id);
      console.log("Selected user ID:", selectedUser._id);

      // Sort participants to ensure consistent order for chat lookup
      const participants = [authUser._id, selectedUser._id].sort();

      try {
        console.log("Requesting chat with participants:", participants);
        const res = await API.post("/chat", { participants }, { signal });
        console.log("Got chat response:", res.data._id);
        setChatId(res.data._id);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Request aborted");
        } else {
          console.error("Error creating/getting chat:", error);
        }
      }
    };
    getOrCreateChat();

    // Cleanup function runs on unmount or before a new effect
    return () => {
      controller.abort();
    };
  }, [authUser, selectedUser]);

  return { chatId };
};

export default useCreateChat;