---
title: 嵌套路由
order: 4
group:
    title: 基础
    order: 4
---

# 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

~~~
 /home                    /person
 ┌────┬───────┬──────┐    ┌────┬───────┬───────┐ ◄──────────────────
 │Home│Person │Orgn  │    │Home│Person │Orgn   │  belongs to root /
 ├────┴───────┴──────┤    ├────┴───────┴───────┤ ◄──────────────────
 │                   │    │                    │
 │                   │    │                    │
 │ This is HomePage! │    │This is PersonPage! │  belongs to /home
 │                   │    │                    │  belongs to /person
 │                   │    │                    │
 └───────────────────┘    └────────────────────┘ ◄──────────────────
~~~

借助 ReactRouter++，使用嵌套路由配置，就可以很简单地表达这种关系。

***首先***，为根路由（/）创建布局组件 `Layout`（注：[@ant-design/pro-layout](https://github.com/ant-design/pro-components/tree/master/packages/layout#readme) 是 [AntDesign](https://ant.design/index-cn) 体系下优秀的开源布局组件）：

```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';
import {PPBrowserRouter, Link, useHistory, useLocation} from "react-router-plus-plus"

const Layout = (props) => {
    const location = useLocation();

    return (
        <div>
            <div>当前路由: {location.pathname}</div>
            <ul style={{border: "2px solid purple"}}>
                <li>
                    <Link to={"/home"}>Home</Link>
                </li>
                <li>
                    <Link to={"/person"}>Person</Link>
                </li>
            </ul>
            <div style={{border: "2px solid blue"}}>
                {props.children}
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <h1>
            This is HomePage!           
        </h1>
    )
};

const Person = () => {
    return (
        <h1>
            This is PersonPage!           
        </h1>
    )
}

export default () => {
    const routes = [{
        path: "/",
        component: Layout,
        children: [{
            path: "/home",
            component: Home
        },{
            path: "/person",
            component: Person
        }]
    }];

    return (
        /*此处配置basename，仅仅为了保证示例能够在 dumi 中正常展示*/
        <PPBrowserRouter
            basename={"/react-router-plus-plus/~demos/nested-routes-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```