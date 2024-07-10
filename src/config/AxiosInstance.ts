import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,  // Replace with your API base URL
  timeout: 10000,  // Request timeout
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default axiosInstance;