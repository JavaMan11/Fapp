//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store';
//把VueRouter原型对象的push 备份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//call和apply的区别
//共同点：都可以调用函数一次，篡改上下文一次
//不同点：传递参数，call用逗号隔开  apply方法执行 传递数组

//第一个参数：告诉原来的方法，你要跳转到哪里（传递哪些参数）
//第二个参数：成功回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //路由跳转的时候滚动条置顶
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

router.beforeEach(async (to, from, next) => {
    //to：获取到你想跳转的路由
    //from：获取你从哪个路由而来
    //next：放行函数 输入next()放行 next(path)放行到指定路由
    // next();
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //用户已经登录
    if (token) {
        //如果用户登录了想去login[不能去,回到home]
        if (to.path == '/login') {
            next('/home')
        } else {
            //用户已登录，去的不是login
            //如果用户名已有
            if (name) {
                next();
            } else {
                //没有用户信息
                try {
                    //派发action 获取用户信息
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token失效了才会进来
                    //清除本地内存
                    await store.dispatch('UserLogout')
                    next('/login');
                }
            }
        }
    } else {
        //未登录，不能去支付相关的，不能去交易相关 ，个人中心
        let toPath = to.path              //和pay相关的路径都不能进入
        if (toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //未登录前用query参数把用户想去的地址传过去
            next('/login?redirect='+toPath)
        }else{
            next();
        }
    }

})

export default router