import React from "react";
import ReactDOM from "react-dom";
import { AuthProviderContext } from "./store/auth-context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthProviderContext>
    <App />
  </AuthProviderContext>,
  document.getElementById("root")
);
