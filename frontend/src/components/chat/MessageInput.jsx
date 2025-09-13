import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import API from '../../services/api.js'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'
import { toast } from 'react-hot-toast'

const MessageInput = ({ chatId }) => { 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedUser } = useAuthContext();
  const { socket } = useSocketContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !chatId) return;

    setLoading(true);
    try {
      console.log("Sending message to chatId:", chatId);
      const res = await API.post(`/messages/send/${chatId}`, { 
        content: message 
      });
      console.log("Message sent successfully:", res.data);
      setMessage("");
      // No need to emit socket event - backend handles this automatically
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        className="input input-bordered flex-1 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading || !chatId} // <-- Disable when loading or no chatId
      />
      <button
        type="submit"
        className="btn bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={loading || !chatId} // <-- Disable when loading or no chatId
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <FaPaperPlane />
        )}
      </button>
    </form>
  );
};

export default MessageInput;