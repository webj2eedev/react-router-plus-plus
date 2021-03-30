import React from "react";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

import type { RouteConfig, RouteConfigs } from "./types";

const EMPTY_COMPONENT = (props) => props.children; // 二级有子路由，但是没有 component，保证三级正常渲染

function CustomRouteComponent(props: {
  route: Exclude<RouteConfig, "key">;
  routeComponentProps: RouteComponentProps<any>;
}) {
  const { route, routeComponentProps } = props;
  const {
    component: Component = EMPTY_COMPONENT,
    props: customRouteComponentProps,
    wrappers,
    children = [],
  } = route;

  // 路由传参
  const routeParams = useParams();
  let extraRouteComponentProps = {};
  if (customRouteComponentProps === true) {
    extraRouteComponentProps = {
      ...routeParams,
    };
  } else if (typeof customRouteComponentProps === "object") {
    extraRouteComponentProps = {
      ...customRouteComponentProps,
    };
  }

  const newProps = {
    route,
    ...routeComponentProps, // 路由参数
    ...extraRouteComponentProps, // 组件参数
  };

  // @ts-ignore
  let wrappedComponent = (
    <Component {...newProps}>{renderRoutes(children)}</Component>
  );

  if (wrappers) {
    wrappers.forEach((wrapper) => {
      wrappedComponent = React.createElement(
        wrapper,
        newProps,
        wrappedComponent
      );
    });
  }

  return wrappedComponent;
}

interface RouteWithSubRoutesProps {
  route: Exclude<RouteConfig, "key">;
  path: string;
}

function RouteWithSubRoutes(props: RouteWithSubRoutesProps) {
  const { route } = props;
  const { exact = false, strict = false, sensitive = false } = route;
  const { redirect } = route;
  const { path } = route; // path maybe a relative path

  if (redirect) {
    return <Redirect exact={exact} strict={strict} from={path} to={redirect} />;
  } else {
    if (route.children) {
      return (
        <Route
          exact={exact}
          strict={strict}
          sensitive={sensitive}
          path={path}
          render={(routeComponentProps: RouteComponentProps<any>) => {
            //Route里面应该渲染render里的东西
            return (
              <CustomRouteComponent
                route={route}
                routeComponentProps={routeComponentProps}
              />
            );
          }}
        />
      );
    } else {
      return (
        <Route
          exact={exact}
          strict={strict}
          sensitive={sensitive}
          path={path}
          render={(routeComponentProps: RouteComponentProps<any>) => {
            //Route里面应该渲染render里的东西
            return (
              <ErrorBoundary>
                <CustomRouteComponent
                  route={route}
                  routeComponentProps={routeComponentProps}
                />
              </ErrorBoundary>
            );
          }}
        />
      );
    }
  }
}

export default function renderRoutes(routes: RouteConfigs) {
  return routes ? (
    <Switch>
      {routes.map((route, index) => {
        const { key, ...rest } = route;
        return (
          <RouteWithSubRoutes key={key || index} route={rest} {...route} />
        );
      })}
    </Switch>
  ) : null;
}
