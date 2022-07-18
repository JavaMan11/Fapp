//插件对外暴露一定是一个对象
//为了理解 v-lazy懒加载而创建的
let myPlugins = {};

myPlugins.install = function(Vue,options){
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins