# 嵌套路由

## 基础

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

***第一步***，设计路由切换策略。
1. 根路由（/）：负责总体布局（Layout），并提供子路由 /home 与 /person 的切换功能
2. 一级路由（/home）：负责展示“系统首页”
3. 一级路由（/person）：负责展示个“人信息页面”

***第二步***，编制路由表。根据路由切换策略、ReactRouter++ 路由表规范，编制路由表。

~~~ts
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
~~~

你会发现，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

***第三步***，编写布局组件 `Layout`（注：[@ant-design/pro-layout](https://github.com/ant-design/pro-components/tree/master/packages/layout#readme) 是 [AntDesign](https://ant.design/index-cn) 体系下优秀的开源布局组件）。布局组件`Layout`负责一级路由的展示以及一级路由的切换功能：

~~~ts
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
                {/* props.children 即代表子路由的渲染组件 */}
                {props.children}
            </div>
        </div>
    )
}
~~~

***第四步***，编写子路由组件

~~~ts
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
~~~

***第五步***，整合（注：下面的例子是可以操作的哟...）

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
                {/* props.children 即代表子路由的渲染组件 */}
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
            // 当 /home 匹配成功，
            // Home 会被渲染在 Layout 的 props.children 中
            path: "/home",
            component: Home
        },{
            // 当 /person 匹配成功，
            // Person 会被渲染在 Layout 的 props.children 中
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

## 相对路径

在嵌套路由中的子路由中，可以使用相对路径，有助于减小配置压力与维护成本。

~~~js
[{
    path: '/',
    component: BasicLayout,
    routes: [
        {
            path: '/',            
            redirect: 'home' // 重定向，也可以使用相对路径
        },
        {
            path: 'home', // 相对路径，相对于根目录 /home
            component: Home,
        },{
            path: 'person', // 相对路径，相对于根目录 /person
            component: Person,
        },
    ]
}]
~~~