import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const state = {
    cartlist: []
}
const mutations = {
    GETCARTLIST(state, cartlist) {
        state.cartlist = cartlist
    }
}
const actions = {
    //购物车数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车数据
    async getDeleteById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //购物车选中状态
    async getUpdataChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除已勾选的购物车产品
    deleteCheckedAllCart({ dispatch, getters }) {
        let PromiseAll = []
        //context里面有 dispatch getters state commit 等同于一个小仓库 我们可以在里面拿出来用
        //从getters中捞出购物车的产品进行遍历 是一个数组
        getters.cartlist.cartInfoList.forEach(item => {
            //如果ischecked==1 就删掉购物车中被勾选的产品 如果不等于就不删
            let promise = item.isChecked == 1 ? dispatch('getDeleteById', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },

    AllChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartlist[0].cartInfoList.forEach(item => {
            let promise = dispatch('getUpdataChecked', {
                skuId:item.skuId,
                isChecked
            });
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll);
    }

}
const getters = {
    cartlist(state) {
        return state.cartlist[0] || []
    },

}

export default {
    state,
    mutations,
    actions,
    getters,
}