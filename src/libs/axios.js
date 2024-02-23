import Axios from "axios";
import { BASE_URL } from "config";
import { AUTH_TOKEN } from "./jwtToken";

const axios = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN()}`
  }
});

export default axios;