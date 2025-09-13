import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuthContext } from '../context/AuthContext'
import { signup } from '../services/auth.service'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {setAuthUser} = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await signup(formData);
      setAuthUser(userData);
      navigate("/") 
    } catch (err) {
      setError(err);
      console.error(err);
    } finally{
      setLoading(false);
    }
  };

  return(
    <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="label">
            <span className="text-base label-text text-gray-700">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full input input-bordered h-12 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="label">
            <span className="text-base label-text text-gray-700">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full input input-bordered h-12 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="label">
            <span className="text-base label-text text-gray-700">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-12 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <Link
          to="/login"
          className="text-sm hover:underline hover:text-blue-700 mt-2 inline-block text-gray-600 mb-6"
        >
          Already have an account?
        </Link>
        <div>
          <button
            type="submit"
            className="btn btn-block h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpPage
