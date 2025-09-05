import { useEffect, useState } from 'react'
import API from '../services/api.'
import { useAuthContext } from '../context/AuthContext'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { selectedUser } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/messages/${selectedUser._id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedUser) {
      getMessages();
    }
  }, [selectedUser]);

  return { loading, messages };
};

export default useGetMessages;