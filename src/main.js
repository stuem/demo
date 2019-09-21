import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.prototype.$ajax = axios
Vue.config.productionTip = false;

//全局配置API路径
axios.defaults.baseURL="http://192.168.1.188";

//全局拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    console.log(config)  //查看是否请求到了数据
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(response =>{
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
