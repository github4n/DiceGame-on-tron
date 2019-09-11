import axios from "axios";
import qs from "qs"; // qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。
import baseUrl from "@/config/baseurl";
import store from '@/vuex/store';

let BASEURL = "";
switch (process.env.NODE_ENV) {
  case "devop": // 开发环境
    BASEURL = baseUrl.devop_domain;
    break;

  case "stage": // 预发布环境
    BASEURL = baseUrl.stage_domain;
    break;

  case "prod": // 生产环境
    BASEURL = baseUrl.prod_domain;
    break;

  case "test": // 测试环境
    BASEURL = baseUrl.test_domain;
    break;

  default:
    BASEURL = baseUrl.devop_domain;
    break;
}
const requestBaseUrl = axios.defaults.baseUR = BASEURL; // 设置请求域
const service = axios.create({
  baseURL: requestBaseUrl,
  timeout: 30000,
  headers: {}// 'content-type': 'application/json'}
});


/* --------------------------------------------------- 添加请求拦截器 -------------------------------------- */
// service.interceptors.request.use((config) => {
//   // 在发送请求之前做某事
//   if(localStorage.getItem('token')){
//     config.headers = {'x-auth-token': localStorage.getItem('token')};
//   }
//   return config;
// }, function(err) {
//   // 接口请求出错可在此处统一处理
//   return Promise.reject(err);
// });

/* --------------------------------------------------- 添加响应拦截器 ---------------------------------------- */
service.interceptors.response.use((response) => {
  // 对响应数据做些事
  if(response.data.code == 4000) { // 未登录
    store.commit('SET_SHOW_POP_MODAL', true);
    // this.$router.push({'path': '/login'});
    return  Promise.reject(response.data);
  }
  return Promise.resolve(response.data);
}, function (err) {
  return Promise.resolve(err)
});

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState (response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  } else {
    alert('数据获取错误')
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState (res) {
  // 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res.data.code === '000000') {
    alert('success')
    return res
  }
}

/* --------------------------------------------------- service ---------------------------------------- */

let httpServices = {
  /* get请求 */
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /* post请求 （json传参）*/
  post(url, data = {}, config) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /* patch请求 */
  patch(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .patch(url, qs.stringify(data, { arrayFormat: "repeat" }))
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  

  /* put请求 */
  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, qs.stringify(data))
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /* delete请求 */
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, { params: params })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },


  /* post请求 （formData形式传参） */
  postFormData(url, data = {}) {
    return new Promise((resolve, reject) => {
      service
        .post(url, qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /* create请求 下载文件*/
  download(url, params = {}) {
    return new Promise((resolve, reject) => {
      let instance = axios.create({ responseType: "blob" });
      instance
        .get(url, { params: params })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default httpServices;
