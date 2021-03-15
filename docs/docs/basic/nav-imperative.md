---
title: 编程式导航
order: 3
group:
    title: 基础
    order: 4
---

# 编程式导航

除了使用 `<Link>` 定义导航链接，我们还可以借助 `history` 对象的`push`、`replace`、`go`、`goBack`、`goForward`实例方法，通过编写代码来实现导航。

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
            <button onClick={() => history.goBack()}>后退</button>
            <button onClick={() => history.goForward()}>前进</button>
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
            <button onClick={() => history.goBack()}>后退</button>
            <button onClick={() => history.goForward()}>前进</button>
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
            basename={"/react-router-plus-plus/~demos/nav-imperative-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```

## 如何获取 history 对象?

* 方式1：Hook 编程模型下，可通过 ReactRouter++ 导出的 `useHistory` 获取。

    ~~~js
    import {useHistory} from "react-router-plus-plus"

    const history = useHistory();

    ...
    ~~~

* 方式2：Class 编程模型下 ...

    ~~~js
    ...
    ~~~

## history.push(path, state?)

想要导航到不同的 URL，则使用 `history.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

~~~js
// 路径
history.push('/user/zhangsan')

// 带查询参数
history.push('/user/zhangsan?plan=private')
~~~

## history.replace(path, state?)

跟 `history.push` 很像，唯一的不同就是，它***不会***向 history 添加新记录，而是***替换***掉当前的 history 记录。

~~~js
// 路径
history.replace('/user/zhangsan')

// 带查询参数
history.replace('/user/zhangsan?plan=private')
~~~

## history.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步。

~~~js
// 在浏览器记录中前进一步，等同于 history.goForward()
history.go(1)

// 后退一步记录，等同于 history.goBack()
history.go(-1)

// 前进 3 步记录
history.go(3)

// 如果 history 记录不够用，那就默默地失败呗
history.go(-100)
history.go(100)
~~~

## history.goBack()

在浏览器记录中后退一步

~~~js
// 相当于 history.go(-1)
history.goBack()
~~~

## history.goForward()

在浏览器记录中***前进***一步

~~~js
// 相当于 history.go(1)
history.goForward()
~~~

