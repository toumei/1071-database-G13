import axios from "axios";
import moment from "moment";
import { md5 } from "../models/crypt.model";

axios.defaults.baseURL = "/api";
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
          //window.location.href = "/user/login";
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

function Security(url, data = undefined) {
  var timestamp = moment().unix();
  var nonce = md5(timestamp + Math.random());
  var sign = md5({
    url: axios.defaults.baseURL + url,
    timestamp: timestamp,
    nonce: nonce
  });
  if (data === undefined) {
    data = { timestamp: timestamp, nonce: nonce, sign: sign };
  } else {
    data["timestamp"] = timestamp;
    data["nonce"] = nonce;
    data["sign"] = sign;
  }
  return data;
}

export default new (class apiRequest {
  // Read
  get(url, data = undefined, config = {}) {
    return axios.get(url, { params: Security(url, data) }, config);
  }

  // Create
  post(url, data = undefined, config = {}) {
    return axios.post(url, Security(url, data), config);
  }

  // Update
  put(url, data = undefined, config = {}) {
    return axios.put(url, Security(url, data), config);
  }

  // Delete
  delete(url, data = undefined, config = {}) {
    return axios.delete(url, { data: Security(url, data) }, config);
  }
})();
