import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { BrowserRouterProps } from "react-router-dom";
import type { PPRoutes } from "./index";

import renderRoutes from "./renderRoutes";
import normalizeRoutes from "./normalizeRoutes";

export interface PPBrowserRouterProps extends BrowserRouterProps {
  routes: PPRoutes;
  beforeEach?: (to, from, next) => Promise<any>;
}

export default function PPBrowserRouter(props: PPBrowserRouterProps) {
  const { routes, beforeEach, ...remain } = props;

  return (
    <BrowserRouter {...remain}>
      {renderRoutes(normalizeRoutes(routes))}
    </BrowserRouter>
  );
}
