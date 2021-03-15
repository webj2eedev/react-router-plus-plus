---
title: (BUG)404 Not found 路由
order: 6
group:
    title: 基础
    order: 4
---


# (BUG)404 Not found 路由

常规参数只会匹配被 / 分隔的 URL 片段中的字符。我们可以使用通配符 (*) 匹配任意路径：

~~~js
{
  // 会匹配所有路径
  path: '*'
}
~~~

路由 `{ path: '*' }` 通常用于客户端 `404` 错误。

当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。

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
                <li>
                    <Link to={"/some/path/not/exist"}>一个不存在的路径</Link>
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

const NotFound = () => {
    return (
        <h1>
            404 NotFound!         
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
    },{
        // 404 NotFound 路由
        path: "*",
        component: NotFound
    }];

    return (
        /*此处配置basename，仅仅为了保证示例能够在 dumi 中正常展示*/
        <PPBrowserRouter
            basename={"/react-router-plus-plus/~demos/404-route-demo"} 
            routes={routes}>
        </PPBrowserRouter>
    );
};
```