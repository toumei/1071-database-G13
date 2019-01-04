import axios from "axios";
import qs from "qs";
import apiManager from "../api/apiManager";

axios.defaults.baseURL = "/api/";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.isRetryRequest = false;
axios.defaults.headers.common["Authorization"] = "YUOR_AUTH_TOKEN";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// http request 攔截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = token;
      config.headers["Authorization"] = token;
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
  get(apiName, config = {}) {
    return axios.get(apiManager[apiName], config);
  }

  // Create
  post(apiName, data = undefined, config = {}) {
    console.log(data);
    return axios.post(apiManager[apiName], data, config);
  }

  // Update
  put(apiName, data = undefined, config = {}) {
    return axios.put(apiManager[apiName], data, config);
  }

  // Delete
  delete(apiName, config = {}) {
    return axios.delete(apiManager[apiName], config);
  }
}();
