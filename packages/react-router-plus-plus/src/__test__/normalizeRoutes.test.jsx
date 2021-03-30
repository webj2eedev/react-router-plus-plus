import React from 'react';
import {render, screen} from '@testing-library/react';

import normalizeRoutes from "../normalizeRoutes"

describe('normalizeRoutes', () => {

    test('', async () => {
        expect(await normalizeRoutes([
            {
                path: '/login',
                component: "---",
            },
            {
                path: '/404',
                component: "---",
            },
            {
                path: '/',
                component: "---",
                routes: [
                    {
                        path: '/',
                        redirect: '/home',
                    },
                    {
                        path: '/home',
                        title: "首页",
                        component: "---",
                    },
                    {
                        path: 'pwdmng', // 测试相对路径
                        title: "密码管理",
                        component: "---",
                    },
                    {
                        path: '/sysmng',
                        title: "系统管理",
                        component: "---",
                        routes: [
                            {
                                path: '/sysmng',
                                component: "---",
                                redirect: '/sysmng/usermng',
                            },
                            {
                                path: '/sysmng/usermng',
                                title: "用户管理",
                                component: "---",
                            },
                            {
                                path: 'paramng',
                                title: "参数管理",
                                component: "---",
                            },
                            {
                                path: '/sysmng/rolemng/:roleid/:rolename', // 测试 path 传参
                                title: "角色管理",
                                component: "---",
                            },
                        ]
                    },
                ]
            }
        ])).toEqual([
            {
                path: '/login',
                component: "---",
                exact: true,
            },
            {
                path: '/404',
                component: "---",
                exact: true,
            },
            {
                path: '/',
                component: "---",
                routes: [
                    {
                        path: '/',
                        redirect: '/home',
                        exact: true,
                    },
                    {
                        path: '/home',
                        title: "首页",
                        component: "---",
                        exact: true,
                    },
                    {
                        path: '/pwdmng', // 测试相对路径
                        title: "密码管理",
                        component: "---",
                        exact: true,
                    },
                    {
                        path: '/sysmng',
                        title: "系统管理",
                        component: "---",
                        routes: [
                            {
                                path: '/sysmng',
                                component: "---",
                                redirect: '/sysmng/usermng',
                                exact: true,
                            },
                            {
                                path: '/sysmng/usermng',
                                title: "用户管理",
                                component: "---",
                                exact: true,
                            },
                            {
                                path: '/sysmng/paramng',
                                title: "参数管理",
                                component: "---",
                                exact: true,
                            },
                            {
                                path: '/sysmng/rolemng/:roleid/:rolename', // 测试 path 传参
                                title: "角色管理",
                                component: "---",
                                exact: true,
                            },
                        ]
                    },
                ]
            }
        ]);
    });
});
