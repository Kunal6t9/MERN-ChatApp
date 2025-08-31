import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { login } from "../services/auth.service";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userData = await login(formData);
      setAuthUser(userData);
      navigate("/");
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
        Login
      </h2>

      <form onSubmit={handleSubmit}>
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
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full input input-bordered h-12 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Link
          to="/signup"
          className="text-sm hover:underline hover:text-blue-700 mt-2 inline-block text-gray-600 mb-6"
        >
          Don't have an account?
        </Link>
        <div>
          <button
            type="submit"
            className="btn btn-block h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;