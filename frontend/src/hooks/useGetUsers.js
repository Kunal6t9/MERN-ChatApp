import { useEffect, useState } from "react";
import API from "../services/api.";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await API.get("/messages/users"); 
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return { loading, users };
};

export default useGetUsers;