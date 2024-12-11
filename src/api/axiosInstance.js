import axios from 'axios';

// Axios instance to centralize API calls and set default configurations
const axiosInstance = axios.create({
  baseURL: 'https://backend-lpju.onrender.com', // Replace with your backend URL (or use a deployed URL)
  headers: {
    'Content-Type': 'application/json',  // Ensure the content type is set
  },
});

export default axiosInstance;
