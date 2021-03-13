---
title: 起步
order: 1
group:
    title: 基础
    order: 4
---

# 起步

我们先从最基本的例子开始，整体上看看如何使用ReactRouter++
1. 

```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';
import {PPBrowserRouter, Link, useHistory, useLocation} from "react-router-plus-plus"

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div>
            <p>当前路由路径: {location.pathname}</p>
            <h1>登录页</h1>
            <button onClick={() => history.push("/home")}>登录</button>
        </div>
    )
}

const Home = () => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div>
            <p>当前路由路径: {location.pathname}</p>
            <h1>Home</h1>
            <button onClick={() => history.push("/")}>退出</button>
        </div>
    )
}

export default () => {
    const routes = [{
        path: "/",
        component: Login
    }, {
        path: "/home",
        component: Home
    }];

    return (
        /*此处配置basename，仅仅为了保证示例能够在 dumi 中正常展示*/
        <PPBrowserRouter
            basename={"/react-router-plus-plus/~demos/guide-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```