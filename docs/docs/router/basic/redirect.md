# 重定向

重定向通常用在嵌套路由场景中，用于设定默认跳转的子路由。

例如：当路由路径为 `/` 时，重定向到路径 `/home`

ReactRouter++ 中在路由表中采用 redirect 字段描述重定向的目标

~~~js
{
    path:'/',
    redirect:'/home',
}
~~~

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
                    <Link to={"/"}>Root</Link>
                </li>
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
            // 路径 / 会直接重定向到路由 /home，
            path: "/",
            redirect: "/home"
        },{
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
            basename={"/react-router-plus-plus/~demos/redirect-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```