import React, { useState, useRef, Component } from "react";
import { PPBrowserRouter, useQuery } from "../../src";
import type { PPRoutes } from "../../src";

import "./style/index.css";

const routes: PPRoutes = [{
  path: "/",
  component: function () {
    const query = useQuery();

    return <h1>login, {JSON.stringify(query)}</h1>
  }
}, {
  path: "/logout",
  component: function () {
    return <h1>logout</h1>
  }
}];

export default function App() {
  const [count, updateCount] = useState(1);

  const onAdd = () => {
    updateCount((count) => count + 1);
  };

  return (
    <>
      <PPBrowserRouter routes={routes}></PPBrowserRouter>
    </>
  );
}
