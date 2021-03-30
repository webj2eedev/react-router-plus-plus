import type React from "react"

/**
 * 基础类型
 */
type Dictionary<V> = { [key: string]: V }

/**
 * 路由静态配置信息
 */
type RouteConfigPropsFunction = (route: any) => Object; // TODO 入参 route，这里有待确定

export interface RouteConfig {
  // react
  key?: any;

  // 基础
  path: string;
  component?: React.ReactElement; // 视图组件
  redirect?: string; // 重定向

  // 命名路由、路由别名
  name?: string;
  alias?: string | string[]

  // 嵌套路由
  children?: RouteConfigs;

  // PathToRegexpOptions
  exact?: boolean; // 表示是否严格匹配，即 location 是否和 path 完全对应上
  strict?: boolean; // 是否严格匹配结尾'/'
  sensitive?: boolean; // 是否大小写敏感匹配

  // 路由传参
  props?: true | Object | RouteConfigPropsFunction,

  // 元信息
  meta?: {
    title?: string,
    icon?: React.ReactElement,
    hideInMenu?: false,
    breadcrumb: false,

    [properties: string]: any;
  }

  // 配置路由的高阶组件封装
  wrappers?: any[];
}

export type RouteConfigs = Array<RouteConfig>;












export type RawLocation = string | Location

export type NavigationGuardNext<V> = (
    to?: RawLocation | false | ((vm: V) => any) | void
) => void

export type NavigationGuard<V> = (
    to: any,
    from: any,
    next: NavigationGuardNext<V>
) => any

