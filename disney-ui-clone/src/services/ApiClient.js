import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        "Content-Type": "application/json"
    },
    params:{
        api_key: import.meta.env.VITE_TMDB_API_KEY
    }
})

apiClient.interceptors.request.use(
    (config) => {
      console.log('Request made to:', config.url);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('Error response:', error.response);
      return Promise.reject(error);
    }
  );

export default apiClient;