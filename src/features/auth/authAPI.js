import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/auth/`;

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  // Agar login successful hai, to user data ko localStorage me save karein
  // Taki page refresh karne par bhi user logged in rahe
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Logout user
const logout = () => {
  // Logout ke liye backend call ki zaroorat nahi, sirf local data saaf karna hai
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;