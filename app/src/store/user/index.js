import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo,reqLoginOut } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token";
//登录与注册的仓库
const state = {
    //验证码
    code: '',
    //用户的唯一标识
    token: localStorage.getItem('TOKEN'),//把存储的信息展示
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //退出登录删除数据
    USERLOGOUT(state){
        //把仓库中的用户信息清空
        state.token = '',
        state.userInfo = {},
        //本地存储清空，详细看token.js
        removeToken();
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码接口，返回的数据是验证码，本来是后台把验证码发到手机上，但是要省钱所以做成接口
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //使用封装函数存储信息
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
   async UserLogout({commit}){
       let result =  await reqLoginOut();
       if(result.code==200){
           commit('USERLOGOUT')
           return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}