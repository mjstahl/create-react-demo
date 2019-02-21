import React from "react";
import ReactDOM from "react-dom";

function HelloMessage ({ name }) {
  return <h1>Hello {name}</h1>
}

const to = document.getElementById("app");
ReactDOM.render(<HelloMessage name="World" />, to);