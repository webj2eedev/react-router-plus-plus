---
title: 动态路径匹配
order: 5
group:
    title: 基础
    order: 4
---

# 动态路径匹配


```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';
import {PPBrowserRouter, Link, useHistory, useLocation, useParams} from "react-router-plus-plus"

const Layout = (props) => {
    const location = useLocation();

    return (
        <div>
            <div>当前路由: {location.pathname}</div>
            <ul style={{border: "2px solid purple"}}>
                <li>
                    <Link to={"/person/zhangsan"}>张三</Link>
                </li>
                <li>
                    <Link to={"/person/lisi"}>李四</Link>
                </li>
                <li>
                    <Link to={"/person/wangwu"}>王五</Link>
                </li>
            </ul>
            <div style={{border: "2px solid blue"}}>
                {/* props.children 即代表子路由的渲染组件 */}
                {props.children}
            </div>
        </div>
    )
}

const Person = () => {
    const {xm} = useParams();
    return (
        <h1>
            Welcome {xm}!           
        </h1>
    )
}

export default () => {
    const routes = [{
        path: "/",
        component: Layout,
        children: [{
            // 动态路径参数 以冒号开头
            path: "/person/:xm",
            component: Person
        }]
    }];

    return (
        /*此处配置basename，仅仅为了保证示例能够在 dumi 中正常展示*/
        <PPBrowserRouter
            basename={"/react-router-plus-plus/~demos/dynamic-matching-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 ReactRouter++ 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

~~~js
const Person = () => {
    return (
        <h1>
            This is PersonPage!         
        </h1>
    )
}

const routes = [{
    path: "/",
    component: Layout,
    children: [{
        // 动态路径参数 以冒号开头
        path: "/person/:xm",
        component: Person
    }]
}];
~~~

现在呢，像 /person/zhangsan、/person/lisi、/person/wangwu 都将映射到相同的路由。

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值可以从 Hook `useParams()` 中获取。于是，我们可以更新 Person 组件，输出当前用户的 xm：

~~~js
import {useParams} from "react-router-plus-plus"

const Person = () => {
    const {xm} = useParams();
    return (
        <h1>
            Welcome {xm}!           
        </h1>
    )
}
~~~

你可以在一个路由中设置多段“路径参数”，对应的值都可以从 `useParams()` 中获取。例如：

|  模式                             | 匹配路径              | useParams()                           | 
|  ----                             | ----                  |  ----                                 |
| /user/:username                   | /user/evan            | { username: 'evan' }                  |
| /user/:username/post/:post_id     | /user/evan/post/123   | { username: 'evan', post_id: '123' }  |


ReactRouter++ 使用 [path-to-regexp^1.7.0](https://github.com/pillarjs/path-to-regexp/blob/v1.7.0/index.d.ts) 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。