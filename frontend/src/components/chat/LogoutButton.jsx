import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthContext} from '../../context/AuthContext'
import { logout } from '../../services/auth.service'

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setAuthUser(null);
      navigate('/login')
    } catch (error) {
      console.log('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btn bg-gray-700 text-white w-full rounded-md py-2 mt-4 hover:bg-gray-800 transition-colors duration-200"
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default LogoutButton;