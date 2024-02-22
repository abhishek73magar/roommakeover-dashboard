import axios from "./axios";
import swr from 'swr'
import { getError } from "./getError";


const swrFetch = (...args) => {
  return axios
    .get(...args)
    .then((res) => res.data)
    .catch(err => Promise.reject(getError(err)));
};


const fetchData = (url) => swr(url, swrFetch)
export default fetchData;