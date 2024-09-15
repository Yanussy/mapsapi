import axios from 'axios';

// Base URL configured from environment variable
const API_URL = process.env.REACT_APP_API_URL + '/api/auth';

// Function to handle user login
const login = async (email, password) => {
  const response = await axios.post(API_URL + '/login', { email, password });
  return response.data;
};

// Function to handle user registration
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);
  return response.data;
};

export { login, register };

