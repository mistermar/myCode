import axios from "axios";
import * as type from "./configLocal";

let baseUrl;
if (type.localUrl) {
  baseUrl = type.localUrl;
}

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

function interceptors(error) {

  if (error.response && 401 === error.response.status) {
    localStorage.removeItem("token");
    document.location.href = "/client/signin";
  }

  if(error.response &&  error.response.status === 500 ){
    let d = error.response &&  error.response.data ? error.response.data.file + " " + error.response.data.line : ""
    let data = {
      "url":error.config.url,
      "data": d,
      "token": error.config.headers.Authorization
    }

    axios.post(`errors`, data)
  }

  return Promise.reject(error);
}

axios.interceptors.response.use(null, error => interceptors(error) );


const api = {
  session: axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  }),
};



export default api;
