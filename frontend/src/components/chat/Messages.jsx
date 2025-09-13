import { useEffect, useState } from "react";
import API from "../../services/api.js";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";

const Messages = ({ chatId }) => {
  // chatId as a prop
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();

  // Fetch messages when chatId changes
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/messages/${chatId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    if (chatId) {
      getMessages();
    }
  }, [chatId]); // <-- Re-run when chatId changes

  // Listen for new messages
  useEffect(() => {
    if (socket) {
      console.log("Setting up socket listener for newMessage");
      socket.on("newMessage", (newMessage) => {
        console.log("Received newMessage:", newMessage);
        console.log("Current chatId:", chatId);
        console.log("Message chatId:", newMessage.chat._id);

        // Only update if the message belongs to the current chat
        if (newMessage.chat._id === chatId) {
          console.log("Adding message to current chat");
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          console.log("Message not for current chat");
        }
      });
    }

    return () => {
      if (socket) {
        console.log("Cleaning up socket listener");
        socket.off("newMessage");
      }
    };
  }, [socket, chatId]);

  if (loading) {
    return <div className="text-center">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message._id}
            className={`p-2 rounded-lg max-w-xs ${
              message.sender._id === authUser._id
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-gray-800 self-start"
            }`}
          >
            {message.messageType === "image" ? (
              <img
                src={message.image}
                alt="Shared image"
                className="max-w-full rounded"
              />
            ) : (
              <span>{message.text}</span>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          No messages yet. Say hi!
        </div>
      )}
    </div>
  );
};

export default Messages;
