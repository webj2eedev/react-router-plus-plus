import NeedUserAuthorized from "../auth/NeedUserAuthorized"

import LRMenuLayout from "../layouts/LRMenuLayout"

import Login from "../pages/Login"
import Home from '../pages/Home';
import UserMng from '../pages/sysmng/UserMng';
import RoleMng from "../pages/sysmng/RoleMng"
import PwdMng from "../pages/sysmng/PwdMng"
import Error404 from "../pages/Error404"
import TestError from '../pages/error'

export default [
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/404',
        component: Error404,
        exact: true
    },
    {
        path:'error',
        title:'错误',
        component:TestError
    },
    {
        path: '/',
        component: LRMenuLayout,
        wrapper: [NeedUserAuthorized],
        routes: [
            {
                path: '/',
                redirect: '/home',
                exact: true
            },
            {
                path: '/home',
                title: "首页",
                component: Home,
                exact: true,
            },
            {
                path: 'pwdmng', // 测试相对路径
                title: "密码管理",
                component: PwdMng,
                exact: true,
            },
            {
                path: 'secondwithoutcomponent',
                title: '二级有子路由，但是没有component，渲染3级路由',
                routes: [{
                    path: 'rolemng',
                    title: '角色管理',
                    component: RoleMng,
                }]
            },
            {
                path: '/sysmng',
                title: "二级有子路由，而且有component",
                component: LRMenuLayout,
                routes: [
                    {
                        path: '/sysmng',
                        component: UserMng,
                        exact: true,
                        redirect: '/sysmng/usermng',
                    },
                    {
                        path: '/sysmng/usermng',
                        title: "用户管理",
                        component: UserMng,
                        exact: true,
                    },
                    {
                        path: '/sysmng/rolemng', // 测试 path 传参
                        title: "角色管理",
                        component: RoleMng,
                        exact: true,
                    },
                    {
                        path: '/sysmng/rolemng/:roleid/:rolename', // 测试 path 传参
                        title: "角色管理带参数",
                        component: RoleMng,
                        exact: true,
                    },
                ]
            },
        ]
    }
];
