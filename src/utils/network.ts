import axios, { AxiosInstance } from "axios";


const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const BASE_CONFIG = {
  baseURL: REACT_APP_BACKEND_URL,
  responseType: 'json',
  timeout: 5000,
}

const backend: AxiosInstance = axios.create(BASE_CONFIG)

const authConstructor = function () {
  const token = window.localStorage.getItem("authToken") || window.sessionStorage.getItem("authToken");
  if (token) {
    return axios.create(Object.assign(BASE_CONFIG, {
      headers: { Authorization: `Bearer ${token}` },
    }))
  } else {
    return axios.create({})
  }
}

const auth = authConstructor()

export default backend;
export { auth, backend };