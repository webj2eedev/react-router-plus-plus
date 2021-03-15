---
title: 介绍
order: 1
---

# 介绍

[ReactRouter++](https://github.com/webj2eedev/react-router-plus-plus) 是 [React](https://reactjs.org/) 官方路由解决方案 [react-router](https://reactrouter.com/) 的增强、扩展版。

## 增强了什么？

在***企业级中后台管理系统***的业务背景下，[react-router](https://reactrouter.com/) 缺少针对一些需求的系统化解决方案。通常需要我们自己造轮子解决。这增大了项目的开发成本（不同的项目，都要反复解决类似的问题）和维护成本（不同的项目，解决方式可能不一样）。

具体有哪些问题，[react-router](https://reactrouter.com/) 没覆盖到或没覆盖全面：

* 路由传参
    * ***问题1：*** 路由中的 `URL查询参数` 部分，不方便提取。（例如：从路径 `/foo?user=1` 中提取到 `user` 参数的值 `1`）。
      * 注1：[react-router](https://reactrouter.com/) 中 `userLoaction()` 接口的 `search` 属性可以提取到整个`URL查询参数字符串`。但`URL 查询参数字符串`到`URL查询参数对象`的解析需要我们自己做（比如：使用 W3C 标准接口 `URLSearchParams` 解析，但是要考虑兼容性问题）。
      * 注2：[Vue Router](https://router.vuejs.org/zh/) 的路由对象`$route`对此提供了良好的封装，可以直接从其 `query` 属性中提取（例如：对于路径`/foo?user=1`，则有 `$route.query.user == 1`）。
    * ***问题2：*** 当`组件`需要获取`路由参数`或`URL查询参数`时，`组件`与`路由`间会形成***紧耦合***。
      * 注1：[react-router](https://reactrouter.com/) 中。一种方式通过直接耦合 `useLocation()` 路由接口获取参数；另一种方式是通过路由默认注入组件的`match`参数中获取。简言之，需要与路由产生紧耦合。
      * 注2：[Vue Router](https://router.vuejs.org/zh/) 中[路由传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)的[布尔模式](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)和[函数模式](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F)，完美解决了上述问题。

* 嵌套路由
    *  ***问题：*** ***路由表不支持配置相对路径***
       *  注：[react-router](https://reactrouter.com/) ***只能***以绝对路径方式配置路由表，当嵌套路由层数很多时，极大地增大了路由表配置复杂度以及维护成本。
       *  注：[Vue Router](https://router.vuejs.org/zh/)、[UmiJS](https://umijs.org/zh-CN) 等路由库，都支持以相对路径方式配置路由表。
  
* 路由鉴权
    *  ***问题：*** ***路由鉴权方案太简单***
       *  注：[react-router](https://reactrouter.com/) 只有[一个简单地官方鉴权示例](https://reactrouter.com/web/example/auth-workflow)，至于你怎么与实际项目结合，自己看着办吧...
       *  注：[Vue Router](https://router.vuejs.org/zh/) 通过`路由卫士`功能实现鉴权，功能很强大。[UmiJS](https://umijs.org/zh-CN) 则通过`wrappers`高阶组件方式，进行路由级别权限校验。
  
* 缓存路由
    *  ***问题：*** ***缺少缓存路由解决方案***
       *  注：***企业级中后台管理系统***中，缓存路由绝对是***非常非常非常***常见的一个需求。
          *  不同的路由组件，要能共存，不能只是简单地互斥。
          *  同一个路由组件，可能会被打开多次（多实例），也要共存，也不能互斥。
       *  注：Vue 体系下有 keep-alive，能解决上述问题；React 体系下面只能自己想办法了...

* 杂项
  * 还有一些周边小问题，例如：
    * `重定向`（例如：没登录时，要能重定向到登录页；如果后端服务session超时，也应该能重定向到登录页）
    * `404 Not found`（例如：访问一个不存在的路由，应该能跳转到某个特殊的 404 路由页面）
    * `异常边界`（例如：一个路由组件发生异常，不能影响其他路由组件，合理设置捕获异常、设置异常边界） 
    * `元数据配置`（例如：路由隐藏、面包屑、图标...）
    * ...

***ReactRouter++ 是在吸收众多开源项目的基础上，为解决【企业级中后台管理系统】的常见问题而诞生的。***

## 致谢

如果没有社区中的这些优秀开源项目，[ReactRouter++](https://github.com/webj2eedev/react-router-plus-plus) 不会诞生的这么顺利，在此鸣谢：

* [React Router](https://reactrouter.com/) 
* [Vue Router](https://router.vuejs.org/zh/)
* [Ant Design Pro](https://pro.ant.design/index-cn)
* [UmiJS](https://umijs.org/zh-CN)
* [Next.js](https://nextjs.org/)
* [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/)
* [iView-admin](https://lison16.github.io/iview-admin-doc/#/)
* [AntDesign](https://ant.design/index-cn)
* [@ant-design/pro-layout](https://github.com/ant-design/pro-components/tree/master/packages/layout#readme)

## 反馈与共建

请访问 [GitHub](https://github.com/webj2eedev/react-router-plus-plus)

## 联系我

欢迎关注微信公众号 "WEBJ2EE"，里面有很多前端开发小干货：
* 前端四皇（HTML、JS、CSS、浏览器 ...）
* React 体系（React基础、Hooks、Fiber、Redux ...）
* 低代码（代码编辑器、微前端 ...）
* DevOps（Git、Maven、GitLab CI/CD ...）
* 算法（排序、查找、LeetCode ...）
* Node.js（npm库 ...）
* Java（Spring、设计模式、面向对象 ...）
* ...

![](./webj2ee-logo.jpg)
