import API from "./api.";

export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Signup failed";
  }
};

export const login = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Login failed";
  }
};

export const logout = async (userData) => {
  try {
    await API.post("/auth/logout");
  } catch (error) {
    throw error.response.data.message || "Logout failed"
  }
};