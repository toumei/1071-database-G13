import axios from "axios";
import qs from "qs";
import apiManager from "../api/apiManager";

axios.defaults.baseURL = "/api/";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.isRetryRequest = false;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// http request 攔截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 攔截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/";
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default new class apiRequest {
  // Read
  get(url, config = {}) {
    return axios.get(url, config);
  }

  // Create
  post(url, data = undefined, config = {}) {
    console.log(url);
    return axios.post(url, data, config);
  }

  // Update
  put(url, data = undefined, config = {}) {
    return axios.put(url, data, config);
  }

  // Delete
  delete(url, config = {}) {
    return axios.delete(url, config);
  }
}();
