import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import './styles/main.css';
import './styles/sidebar.css';
import './styles/pages.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
