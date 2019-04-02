import axios from "axios";


const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const backend = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  responseType: 'json',
})

export default backend;