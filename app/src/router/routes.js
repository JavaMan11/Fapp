
export default [
    {
        path: "/center",
        name: 'Center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            }, 
            {
                path:'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            {
                path:'/center',
                redirect:'/center/myorder' //如果访问的是center 直接变成/center/myorder
            }
        ]
    },
    {
        path: "/paysuccess",
        name: 'PaySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: "/pay",
        name: 'Pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: "/trade",
        name: 'trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        name: 'shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: "/addCartSuccess",
        name: 'addCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: "/detail/:skuid",
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import ('@/pages/Search'),
        meta: { show: true },
        name: "search"
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    //重定向， 让项目跑起来的时候 访问 / 立马定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]