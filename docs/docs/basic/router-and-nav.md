---
title: 配置项
group:
    title: 基础
    order: 4
---

# 


# 配置项

首先我们了解一下本项目配置路由时提供了哪些配置项。

~~~typescript
export interface PPRoute {
    // react.key
    key?: any;

    // 基础
    path: string; // 路由路径，支持相对路径配置
    redirect?: string; // 重定向路径
    component?: any; // 视图组件
    routes?: Array<PPRoute>; // 嵌套路由
    
    // Router.匹配策略
    exact?: boolean; // 表示是否严格匹配，即 location 是否和 path 完全对应上
    strict?: boolean; // 是否严格匹配结尾'/'
    sensitive?: boolean; // 是否大小写敏感匹配

    // 路由传参
    props?: true | Object | ()=>({
        [properties:string]:any;
    }),
    
    // 元信息
    meta?: {
        title?: string,
        icon?: JSX.Element,
        hideInMenu?: false,
        breadcrumb: false,
        [properties:string]:any;
    }

    // 配置路由的高阶组件封装
    wrappers?: any[];
}
~~~