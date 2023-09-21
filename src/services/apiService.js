import axios from 'axios';
import { API_URL, AUTH_TOKEN } from '../utils/const';

const apiService = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    authentication: `Bearer ${AUTH_TOKEN}`,
  },
});

export default apiService;
