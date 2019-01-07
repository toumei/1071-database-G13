import axios from "axios";

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
          window.location.href = "/user/login";
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default new class apiRequest {
  // Read
  get(url, data = undefined, config = {}) {
    return axios.get(url, { params: data }, config);
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
  delete(url, data = undefined, config = {}) {
    return axios.delete(url, { data: data }, config);
  }
}();
