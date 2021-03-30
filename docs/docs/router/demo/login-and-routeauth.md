---
title: 登录与路由鉴权
order: 1
group:
    title: 案例
    order: 6
---

# 登录与路由鉴权

## 前言

进入正题，做后台项目区别于做其它的项目，权限验证与安全性是非常重要的，可以说是一个后台项目一开始就必须考虑和搭建的基础核心功能。我们所要做到的是：不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成。这里先简单说一下，我实现登录和权限验证的思路。

* 登录：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后（我会将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态），前端会根据token再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

* 权限验证：通过token获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRoutes 动态挂载这些路由。

上述所有的数据和操作都是通过vuex全局管理控制的。

## 登录篇

> 首先我们不管什么权限，来实现最基础的登录功能。

随便找一个空白页面撸上两个input的框，一个是登录账号，一个是登录密码。再放置一个登录按钮。我们将登录按钮上绑上click事件，点击登录之后向服务端提交账号和密码进行验证。
这就是一个最简单的登录页面。如果你觉得还要写的更加完美点，你可以在向服务端提交之前对账号和密码做一次简单的校验。








```jsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React, {useState, useEffect, useContext} from 'react';
import {PPBrowserRouter, Link, useHistory, useLocation} from "react-router-plus-plus"

// 模拟类函数
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Hooks——用户管理——Begin
const CurrentUserContext = React.createContext();
function CurrentUserProvider(props){
    const [user, setUser] = useState(null);

    return <CurrentUserContext.Provider value={{
        user,
        setUser
    }}>{props.children}</CurrentUserContext.Provider>;
}
function useCurrentUser(){
    const {user, setUser} = useContext(CurrentUserContext);
    return [user, setUser];
}
// End

// 路由组件——Begin
const Login = () => {
    const history = useHistory();
    const [user, setUser] = useCurrentUser();

    const handleLogin = async () => {
        await delay(2 * 1000); // simulate async login...
        setUser("ADMIN");
        history.push("/");
    };

    return (
        <div>
            <h1>登录页</h1>
            <div>
                <div>
                    <label>用户名：</label><input type={"text"}/>
                </div>
                <div>
                    <label>密码：</label><input type={"password"}/>
                </div>
                <div>
                    <button onClick={handleLogin}>登录</button>
                </div>
            </div>
        </div>
    )
}

const Home = () => {
    const history = useHistory();
    const [user, setUser] = useCurrentUser();

    useEffect(() => {
        if(!user){
            history.push("/login");
        }
    });

    return (
        <div>
            这是Home, {user}        
        </div>
    )
}
// End

export default () => {
    const routes = [{
        path: "/login",
        component: Login
    }, {
        path: "/",
        children: [
            {
                path: "/",
                redirect: "home"
            },{
                path: "home",
                component: Home
            }
        ]
    }];

    return (
        /*此处配置basename，仅仅为了保证示例能够在 dumi 中正常展示*/
        <CurrentUserProvider>
            <PPBrowserRouter
                basename={"/react-router-plus-plus/~demos/login-and-routeauth-demo"} 
                routes={routes}>
            </PPBrowserRouter>
        </CurrentUserProvider>
    );
};
```


