import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (accessToken?: string): AxiosInstance => {
  if (accessToken === undefined) {
    throw new Error('Access token is required to create an authenticated Axios instance.');
  }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CLIENT_URL, // Replace with your API base URL
    timeout: 10000, // Request timeout
    headers: {
      'Content-Type': 'application/json',
      // Optionally add other headers
    },
  });

  // Request interceptor to include Bearer token if accessToken is provided
  instance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
