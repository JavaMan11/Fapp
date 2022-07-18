import Vue from 'vue'
import App from './App.vue'
//注册全局组件 三级联动
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
//注册全局组件，轮播图
import Carsousel from '@/components/Carousel'
Vue.component(Carsousel.name, Carsousel)
//注册全局组件，分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination) //名字是Pagination，组件是Pagination
//按需引入elementUI
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
//引入Vuex仓库
import store from '@/store'
//引入模拟数据仓库
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
//引入API接口
import * as API from '@/api'
//引入图片
import atm from '@/assets/1.gif'
import VueLazyload from 'vue-lazyload'
//注册组件
Vue.use(VueLazyload,{
  //图片懒加载默认图片
  loading:atm
})

import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
});

//引入表单校验插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  //全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  router,
  //注册仓库：组件实例对象多了一个属性$store
  store
}).$mount('#app')
