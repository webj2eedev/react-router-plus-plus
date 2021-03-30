# 部署与路由配置

## 根目录部署

如果你打算采用 `http://ip:port` 作为系统访问入口，那就是`根目录`部署。

`根目录`部署，不需要什么特殊配置

## 非根目录部署

经常有同学问这个问题：

> 为什么我本地开发是好的，部署后就没反应了，而且没有报错？

没有报错！ 这是应用部署在非根路径的典型现象。为啥会有这个问题？因为路由没有匹配上，比如你把应用部署在 /xxx/ 下，然后访问 /xxx/hello，而代码里匹配的是 /hello，那就匹配不上了，而又没有定义 fallback 的路由，比如 404，那就会显示空白页。

怎么解决？

可通过配置 base 解决。

如果你打算采用 `http://ip:port/appname` 作为系统访问入口，那就是`非根目录`部署

1. `PPBrowserRouter`注意配置`basename`属性为`/appname`，设置基准路由路径；


## 静态资源在非根目录或 cdn

这时，就需要配置 publicPath。至于 publicPath 是啥？具体看 webpack 文档，把他指向静态资源（js、css、图片、字体等）所在的路径。

配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 publicPath 设置成 ./ 相对路径。

> 相对路径 ./ 有一些限制，例如不支持多层路由 /foo/bar，只支持单层路径 /foo

如果你的应用部署在域名的子路径上，例如 https://www.your-app.com/foo/，你需要设置 publicPath 为 /foo/，如果同时要兼顾开发环境正常调试，你可以这样配置：

~~~
publicPath: process.env.NODE_ENV === 'production' ? '/foo/' : '/',
~~~

2. `webpack`还要配置 `publicPath` 为`/appname`；

## F5问题、404配置