// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/'; // Update with your backend API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a function to set the JWT token to the headers
const setAuthToken = (token:any) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token); // Set token in localStorage
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken'); // Remove token from localStorage
  }
};

const logout = () => {
  setAuthToken(null); // Remove token during logout
};
  
// Add other API request functions
const login = async (email:string, password:string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const { token } = response.data;
    setAuthToken(token); 
    return response.data;
  } catch (error:any) {
    // console.log("login", error.response.data.msg)
    throw error.response.data.msg;
  }
};


// register
const register = async (userData:object) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  } catch (error:any) {
    // console.log("register", error.response.data.msg)
    throw error.response.data.msg;
  }
};

// fetch user
const fetchUserProfile = async (id:string) => {
  try {
    // Set the auth token from localStorage
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    // Make a request to fetch the user profile by ID
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    // Handle error, e.g., redirect to login if unauthorized
    console.error('Error fetching user profile:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export { axiosInstance, setAuthToken, login, register, fetchUserProfile, logout };


















