//search模块的小仓库
import { reqGetSearchInfo } from "@/api";
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
//简化数据用的，不需要用mapstate这么麻烦
const getters = {
    //这个参数的state是小仓库的state，不是大仓库的
    attrsList(state) {
        //如果服务器数据回来了，返回一个数组
        //如果网络出现了问题，至少返回一个空数组  undefined不能遍历
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}