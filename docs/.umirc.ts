import { defineConfig } from 'dumi';

export default defineConfig({
  base: "/react-router-plus-plus",
  publicPath: "/react-router-plus-plus/",
  title: 'ReactRouter++',
  description: "企业级中后台管理系统的增强版ReactRouter",
  favicon: 'avatar.png',
  logo: '/avatar.png',
  outputPath: 'docs-dist',
  mode: "site",
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'ReactRouter++',
      path: '/router',
    },
    {
      title: 'history++',
      path: '/history',
    },
    {
      title: '与我联系',
      path: '/contactme',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/webj2eedev/react-router-plus-plus',
    },
  ],
  menus: {
    '/router': [
      {
        title: '介绍',
        path: '/router/intro',
        // children: [
        //   // 菜单子项（可选）
        //   'intro.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        // ],
      },
      {
        title: '安装',
        path: '/router/install',
      },
      {
        title: '基础',
        children: [
          {
            title: '起步',
            path: '/router/basic/guide',
          },
          {
            title: '声明式导航',
            path: '/router/basic/nav-declaritive',
          },
          {
            title: '编程式导航',
            path: '/router/basic/nav-imperative',
          },
          {
            title: '嵌套路由',
            path: '/router/basic/nested-routes',
          },
          {
            title: '动态路径匹配',
            path: '/router/basic/dynamic-matching',
          },
          {
            title: '重定向',
            path: '/router/basic/redirect',
          },
          {
            title: '(BUG)404 Not found 路由',
            path: '/router/basic/404-route',
          },
          {
            title: '路由组件传参',
            path: '/router/basic/passing-props',
          },
          {
            title: 'History、Hash 路由模式',
            path: '/router/basic/history-hash-mode',
          },
        ],
      },
      {
        title: '进阶',
        children: [
          {
            title: '导航守卫',
            path: '/router/advanced/navigation-guards',
          },
          {
            title: '路由懒加载',
            path: '/router/advanced/lazy-loading',
          },
          {
            title: '路由元信息',
            path: '/router/advanced/meta',
          },
          {
            title: '部署与路由配置',
            path: '/router/advanced/deploy',
          },
          {
            title: '单元测试',
            path: '/router/advanced/unittest',
          },
        ],
      },
      {
        title: '案例',
        children: [
          {
            title: '登录与路由鉴权',
            path: '/router/demo/login-and-routeauth',
          },
          {
            title: '跳转前确认',
            path: '/router/demo/confirming-navigation',
          },
        ],
      },
      {
        title: 'API',
        path: '/router/api',
      },
    ],
    '/history': [
      {
        title: '介绍',
        path: '/history/intro',
      },
      {
        title: 'API',
        path: '/history/api',
      },
    ]
  },
});
