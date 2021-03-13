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
import React from 'react';
import {PPBrowserRouter} from "react-router-plus-plus"

const Login = () => {
    return <h1>Login</h1>
}

const Home = () => {
    return <h1>Home</h1>
}

const Logout = () => {
    return <h1>Logout</h1>
}

export default () => {
    const routes = [{
        path: "*",
        component: Home
    }, {
        path: "/login",
        component: Login
    }, {
        path: "/logout",
        component: Logout
    }];

    return <PPBrowserRouter routes={routes}></PPBrowserRouter>;
};
```