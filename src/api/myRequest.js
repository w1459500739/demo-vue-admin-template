import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken, clearAll } from "@/utils/myAuth";
import router from "@/router/index";
// create an axios instance
const service = axios.create({
  //   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    var token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    if (res.code === 20002) {
      clearAll();
      router.push({ path: "/login" });
    }
    return res;
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

function http(option) {
  var newoption = {
    url: option.url,
    method: option.method
  };
  if (option.method === "GET") {
    newoption.pramas = option.data;
  } else {
    newoption.data = option.data;
  }
  return service(newoption);
}
export default http;
