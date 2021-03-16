---
title: 路由组件传参
order: 8
group:
    title: 基础
    order: 4
---

# 路由组件传参

如何给路由组件传参？路由组件如何获取这些参数？

## 路径参数 => useParams()

路由路径中可通过 :xyz 形式定义路径参数

~~~js
{
    path: "/student/:id/:classno",
    component: Student
}
~~~

路由组件则可以通过 `useParams()` 获取`路由路径`中的参数值

~~~js
import {useParams} from "react-router-plus-plus"

const Student = (props) => {
    const {id, classno} = useParams();
    return (
        <h1>
            Student {id} in class {classno}!           
        </h1>
    )
}
~~~

## 路径参数 => 组件参数

在组件中使用 `useParams()` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

如果 props 被设置为 `true`，`useParams()` 中的路径参数会被***自动***映射为组件参数，

~~~js
{
    path: "/teacher/:id/:classes",
    component: Teacher,
    props: true,
}
~~~

这样组件可以直接通过 `props` 获取参数，而不需要耦合路由API `useParams()`，增大了灵活性。

~~~js
const Teacher = (props) => {
    return (
        <h1>
            Teacher {props.id} today has {props.num} classes!           
        </h1>
    )
}
~~~

## 静态组件参数

路由表可配置 `props` 字段。如果 `props` 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

~~~js
{
    path: "/person",
    component: Person,
    props: {
        xm: "张三",
        age: 18
    }
}
~~~

组件参数可从组件 `props` 属性中直接获取

~~~js
const Person = (props) => {
    return (
        <h1>
            This is {props.xm} age {props.age}!           
        </h1>
    )
}
~~~

## 综合示例

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
                    <Link to={"/person"}>Person-静态组件参数</Link>
                </li>
                <li>
                    <Link to={"/student/:001/:9"}>Student-路径参数=>useParams</Link>
                </li>
                <li>
                    <Link to={"/teacher/:002/:3"}>Teacher-路径参数=>组件参数</Link>
                </li>
            </ul>
            <div style={{border: "2px solid blue"}}>
                {/* props.children 即代表子路由的渲染组件 */}
                {props.children}
            </div>
        </div>
    )
}

const Person = (props) => {
    return (
        <h1>
            This is {props.xm} age {props.age}!           
        </h1>
    )
}

const Student = (props) => {
    const {id, classno} = useParams();
    return (
        <h1>
            Student {id} in class {classno}!           
        </h1>
    )
}

const Teacher = (props) => {
    return (
        <h1>
            Teacher {props.id} today has {props.num} classes!           
        </h1>
    )
}

export default () => {
    const routes = [{
        path: "/",
        component: Layout,
        children: [{
            // 路径 / 会直接重定向到路由 /home，
            path: "/",
            redirect: "/person"
        },{
            path: "/person",
            component: Person,
            props: {
                xm: "张三",
                age: 18
            }
        },{
            path: "/student/:id/:classno",
            component: Student
        },{
            path: "/teacher/:id/:classes",
            component: Teacher,
            props: true,
        }]
    }];

    return (
        /*此处配置basename，仅仅为了保证示例能够在 dumi 中正常展示*/
        <PPBrowserRouter
            basename={"/react-router-plus-plus/~demos/passing-props-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```