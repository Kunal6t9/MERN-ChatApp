import axios from 'axios'

const API_URL = "http://localhost:5001/api/auth/";

export const signup = async (userData) => {
  try {
    const response = await axios.post(API_URL + "signup",userData);
    return response.data;
  } catch (error) {
    console.log("SignUp failed .. Try again Later ",error.message);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    return response.data;
  } catch (error) {
    console.log("Login Failed.. Try again later ",error.message);
  }
};

