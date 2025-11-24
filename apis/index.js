import axios from "axios";
import { USDA_API_KEY } from '@env';

const BASE_URL = "https://api.nal.usda.gov/fdc/v1";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: USDA_API_KEY,
  },
});

export default api;
