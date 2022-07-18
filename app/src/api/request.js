//对于axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//start:进度条开始  done：进度条结束
import store from '@/store';


//利用axios对象的方法create，去创建一个axios实例
//request就是axios 只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //当发请求的时候，路径当中会出现api 不用自己写
    baseURL: "/api",
    //代表请求超时时间是5秒
    timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config是一个配置对象 有一个重要属性 headers请求头
    //进度条开始动
    if (store.state.detail.uuid_token) {
        //这个请求头字段不能随便命名，要和后端沟通好
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //把token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    return config;
});

//响应拦截器  服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error('faile'))
});

export default requests;