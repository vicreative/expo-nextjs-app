import axios from 'axios';
import env from '../env';
import axiosConfig from './config';

export const instance = axios.create({
  baseURL: env.API_URL
});

axiosConfig(instance);
