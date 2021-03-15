/*
 * react-router-dom
 */
// router
export { BrowserRouter, HashRouter, Link, Prompt, Redirect, Route, Switch, withRouter } from "react-router-dom"

// hooks
export { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom"


/*
 * extend
 */
// router
export { default as PPBrowserRouter } from "./PPBrowserRouter"

// hooks
export { default as useQuery } from "./hooks/useQuery"

/*
 * interface
 */
export interface PPRoute {
    // react
    key?: any;

    // 基础
    path: string;
    component?: any; // 视图组件
    redirect?: string; // 重定向

    // 命名路由
    name?: string;

    // 嵌套路由
    children?: PPRoutes;

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

        [properties: string]: any;
    }

    // 配置路由的高阶组件封装
    wrappers?: any[];
}

export type PPRoutes = Array<PPRoute>;

