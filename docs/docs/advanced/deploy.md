---
title: 部署与路由配置
order: 5
group:
    title: 进阶
    order: 5
---

# 部署与路由配置

## 根目录部署

如果你打算采用 `http://ip:port` 作为系统访问入口，那就是`根目录`部署。

`根目录`部署，不需要什么特殊配置

## 非根目录部署

如果你打算采用 `http://ip:port/appname` 作为系统访问入口，那就是`非根目录`部署

1. `PPBrowserRouter`注意配置`basename`属性为`/appname`，设置基准路由路径；
2. `webpack`还要配置 `publicPath` 为`/appname`；

## F5问题、404配置