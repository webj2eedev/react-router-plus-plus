import normalizeRoutes from "./normalizeRoutes"
import {default as innerRenderRoutes}  from "./renderRoutes"

export * from "react-router-dom"

export interface MxRoute {
    // react
    key?: any;

    // 基础
    path: string;
    component?: any; // 视图组件
    redirect?: string; // 重定向

    // 命名路由
    name?: string;

    // 嵌套路由
    routes?: MxRoutes;

    // 匹配策略
    exact?: boolean; // 表示是否严格匹配，即 location 是否和 path 完全对应上
    strict?: boolean; // 是否严格匹配结尾'/'
    sensitive?: boolean; // 是否大小写敏感匹配

    // 路由传参
    props?: true | Object | Function,

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

export type MxRoutes = Array<MxRoute>;

export function renderRoutes(routes: MxRoutes){
    return innerRenderRoutes(normalizeRoutes(routes))
}
