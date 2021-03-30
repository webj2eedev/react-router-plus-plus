# API

## Basic

### history

可用于获取当前路由信息，

~~~js
// history 对象可通过 useHistory()、withRouter()、路由组件获取

// history 栈里的实体个数
console.log(history.length);

// 当前 history 跳转的 action，有 PUSH、REPLACE 和 POP 三种类型
console.log(history.action);

// location 对象，包含 pathname、search 和 hash
console.log(history.location.pathname);
console.log(history.location.search);
console.log(history.location.hash);
~~~

可用于路由跳转，

~~~js
// history 对象可通过 useHistory()、withRouter()、路由组件获取

// 跳转到指定路由
history.push('/list');

// 带参数跳转到指定路由
history.push('/list?a=b');
history.push({
  pathname: '/list',
  query: {
    a: 'b',
  },
});

// 跳转到上一个路由
history.goBack();
~~~

也可用于路由监听，

~~~js
// history 对象可通过 useHistory()、withRouter()、路由组件获取

const unlisten = history.listen((location, action) => {
  console.log(location.pathname);
});
unlisten();

~~~


## Components

### PPBrowserRouter

### PPHashRouter

### Link

链接组件，例如：

~~~js
import { Link } from 'react-router-plus-plus';

export default () => {
  return (
    <div>
      {/* 点击跳转到指定 /about 路由 */}
      <Link to="/about">About</Link>

      {/* 点击跳转到指定 /courses 路由，
          附带 query { sort: 'name' }
      */}
      <Link to="/courses?sort=name">Courses</Link>

      {/* 点击跳转到指定 /list 路由，
          附带 query: { sort: 'name' }
          附带 hash: 'the-hash'
          附带 state: { fromDashboard: true }
      */}
      <Link
        to={{
          pathname: "/list",
          search: "?sort=name",
          hash: "#the-hash",
          state: { fromDashboard: true },
        }}
      >
        List
      </Link>

      {/* 点击跳转到指定 /profile 路由，
          附带所有当前 location 上的参数
      */}
      <Link
        to={location => {
          return { ...location, pathname: "/profile" };
        }}
      />

      {/* 点击跳转到指定 /courses 路由，
          但会替换当前 history stack 中的记录
      */}
      <Link to="/courses" replace />

      {/* 
          innerRef 允许你获取基础组件（这里应该就是 a 标签或者 null）
      */}
      <Link
        to="/courses"
        innerRef={node => {
          // `node` refers to the mounted DOM element
          // or null when unmounted
        }}
      />
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出


### NavLink

特殊版本的 `<Link />` 。当指定路由（`to=指定路由`）命中时，可以附着特定样式。

~~~js
import { NavLink } from 'react-router-plus-plus';

export default () => {
  return (
    <div>
      {/* 和 Link 等价 */}
      <NavLink to="/about">About</NavLink>

      {/* 当前路由为 /faq 时，附着 class selected */}
      <NavLink to="/faq" activeClassName="selected">
        FAQs
      </NavLink>

      {/* 当前路由为 /faq 时，附着 style */}
      <NavLink
        to="/faq"
        activeStyle={{
          fontWeight: "bold",
          color: "red",
        }}
      >
        FAQs
      </NavLink>

      {/* 当前路由完全匹配为 /profile 时，附着 class */}
      <NavLink exact to="/profile" activeClassName="selected">
        Profile
      </NavLink>

      {/* 当前路由为 /profile/ 时，附着 class */}
      <NavLink strict to="/profile/" activeClassName="selected">
        Profile
      </NavLink>

      {/* 当前路由为 /profile，并且 query 包含 name 时，附着 class */}
      <NavLink
        to="/profile"
        exact
        activeClassName="selected"
        isActive={(match, location) => {
          if (!match) {
            return false;
          }
          return location.search.includes("name");
        }}
      >
        Profile
      </NavLink>
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出


### Prompt

提供一个用户离开页面时的提示选择。

~~~js
import { Prompt } from 'react-router-plus-plus';

export default () => {
  return (
    <div>
      {/* 用户离开页面时提示一个选择 */}
      <Prompt message="你确定要离开么？" />

      {/* 用户要跳转到首页时，提示一个选择 */}
      <Prompt
        message={location => {
          return location.pathname !== "/" ? true : `您确定要跳转到首页么？`;
        }}
      />

      {/* 根据一个状态来确定用户离开页面时是否给一个提示选择 */}
      <Prompt when={formIsHalfFilledOut} message="您确定半途而废么？" />
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出


### withRouter

高阶组件，可以通过 withRouter 获取到 history、location、match 对象

~~~js
import { withRouter } from "react-router-plus-plus";

export default withRouter(({ history, location, match }) => {
  return (
    <div>
      <ul>
        <li>history: {history.action}</li>
        <li>location: {location.pathname}</li>
        <li>match: {`${match.isExact}`}</li>
      </ul>
    </div>
  );
});
~~~

> 注：此接口从 `react-router` 中原生导出


## Hooks

### `useHistory`

hooks，获取 history 对象

~~~js
import { useHistory } from "react-router-plus-plus";

export default () => {
  const history = useHistory()
  return (
    <div>
      <ul>
        <li>history: {history.action}</li>
      </ul>
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出

### `useLocation`

hooks，获取 location 对象

~~~js
import { useLocation } from "react-router-plus-plus";

export default () => {
  const location = useLocation()
  return (
    <div>
      <ul>
        <li>location: {location.pathname}</li>
      </ul>
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出

### `useParams`

hooks，获取 `params` 对象。 `params` 对象为动态路由（例如：`/users/:id`）里的参数键值对。

~~~js
import { useParams } from "react-router-plus-plus";

export default () => {
  const params = useParams()
  return (
    <div>
      <ul>
        <li>params: {JSON.stringify(params)}</li>
      </ul>
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出

### `useRouteMatch`

获取当前路由的匹配信息。

~~~js
import { useRouteMatch } from "react-router-plus-plus";

export default () => {
  const match = useRouteMatch()
  return (
    <div>
      <ul>
        <li>match: {JSON.stringify(match.params)}</li>
      </ul>
    </div>
  );
};
~~~

> 注：此接口从 `react-router` 中原生导出

### `useQuery`

hooks，获取 `URL查询` 对象。 `query` 对象为动态路由（例如：`/person?xm=zhangsan&age=18`）里的查询参数键值对。

~~~js
import { useQuery } from "react-router-plus-plus";

export default () => {
  const query = useQuery()
  return (
    <div>
      <ul>
        <li>query: {JSON.stringify(query)}</li>
      </ul>
    </div>
  );
};
~~~

> 此接口由 `ReactRouter++` 扩展


## Ohters

### BrowserRouter

> 注：此接口从 `react-router` 中原生导出


### HashRouter

> 注：此接口从 `react-router` 中原生导出


### MemoryRouter

> 注：此接口从 `react-router` 中原生导出

### Router

> 注：此接口从 `react-router` 中原生导出


### createBrowserHistory

> 注：此接口从 `history` 中原生导出

### createHashHistory

> 注：此接口从 `history` 中原生导出

### createMemoryHistory

> 注：此接口从 `history` 中原生导出
