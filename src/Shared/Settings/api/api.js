import axios from "axios"
import { getToken } from '../Services/Auth/auth'

const api = axios.create({
  baseURL: 'https://ancient-dusk-81972.herokuapp.com/',
  responseType: "json"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default api