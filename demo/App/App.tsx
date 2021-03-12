import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./style/index.css";

export default function App() {
  const [count, updateCount] = useState(1);

  const onAdd = () => {
    updateCount((count)=>count+1);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={onAdd}>add</button>
    </>
  );
}
