import axios from "axios";

// Base URL from your environment variables
const API_URL = `${process.env.REACT_APP_API_URL}/api`;

// Function for logging in or signing up
export const loginOrSignUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    return response.data; // Return the response data (usually contains token and user info)
  } catch (error) {
    console.error("Error during login/signup:", error.response.data);
    throw error.response.data; // Throw the error to be caught by the calling function
  }
};

// Fetch all user emails
export const getAllEmails = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/friends`);
    return response.data; // This will return the array of emails
  } catch (error) {
    console.error(
      "Error fetching emails:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};
// Function to update user's location
export const updateLocation = async (email, latitude, longitude) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    const response = await axios.post(
      `${API_URL}/user/location`,
      {
        email,
        location: {
          latitude,
          longitude,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      },
    );

    return response.data; // Return the response data (could be success message or updated user info)
  } catch (error) {
    console.error(
      "Error updating location:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message; // Throw the error to be caught by the calling function
  }
};
const authService = {
  updateLocation,
};

export default authService;
