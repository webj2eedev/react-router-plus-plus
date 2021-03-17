---
title: 起步
order: 1
group:
    title: 基础
    order: 4
---

# 起步

[ReactRouter++](https://github.com/webj2eedev/react-router-plus-plus) 主要面向`企业级中后台管理应用`，应用都是单页应用，页面地址的跳转都是在浏览器端完成的，不会重新请求服务端获取 html，html 只在应用初始化时加载一次。所有页面由不同的组件构成，页面的切换其实就是不同组件的切换，你只需要在配置中把不同的路由路径和对应的组件关联上。

## 配置路由

在`<PPBrowserRouter>`组件中通过 routes 进行配置，格式为路由信息的数组。

比如：

~~~js
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

    return <PPBrowserRouter routes={routes}></PPBrowserRouter>;
};
~~~

### path

* Type: `string`

配置可以被 [path-to-regexp@^1.7.0](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) 理解的路径通配符。
 
### component

* Type: `React.Element`

配置 location 和 path 匹配后用于渲染的 React 组件

### children

配置子路由，通常在需要为多个路径增加 layout 组件时使用。


### redirect

* Type: `string`

配置路由跳转。

示例中如果访问路径 `/`，会跳转到 `/home`，并由 Home 组件进行渲染。

### wrappers

* Type: `string[]`

配置路由的高阶组件封装。

可以用于实现[路由鉴权](/advanced/authority)。

## 路由组件参数

路由组件可通过 props 获取到以下属性，

* match，当前路由和 url match 后的对象，包含 `params`、`path`、`url` 和 `isExact` 属性
* location，表示应用当前处于哪个位置，包含 `pathname`、`search`、`query` 等属性
* history，同 [api#history](/api#history) 接口
* route，当前路由配置，包含 `path`、`exact`、`component`、`routes` 等
* routes，全部路由信息

比如：

~~~js
export default function Home(props) {
  console.log(props.route);
  return <div>Home Page</div>;
}
~~~