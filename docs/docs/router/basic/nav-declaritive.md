# 声明式导航

最基本的导航方式，就是使用 ReactRouter++ 导出的 `<Link to={...}>` 组件实现声明式导航

通过 `Link` 使用，通常作为 React 组件使用。

~~~js
import {Link} from "react-router-plus-plus"

<Link to="/about">About</Link>
~~~

```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';
import {PPBrowserRouter, Link, useLocation} from "react-router-plus-plus"

const Login = () => {
    const location = useLocation();
    return (
        <div>
            <p>当前路由路径: {location.pathname}</p>
            <h1>登录页</h1>
            <Link to={"/home"}>登录</Link>
        </div>
    )
}

const Home = () => {
    const location = useLocation();
    return (
        <div>
            <p>当前路由路径: {location.pathname}</p>
            <h1>Home</h1>
            <Link to={"/"}>退出</Link>
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
            basename={"/react-router-plus-plus/~demos/nav-declaritive-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```