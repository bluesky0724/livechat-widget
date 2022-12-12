import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

// const widget = document.createElement('div');
// widget.setAttribute('id', 'mymember-livechat');
// document.body.appendChild(widget)
const root = ReactDOM.createRoot(document.getElementById("mymember-livechat"));
root.render(
  <React.StrictMode>
    <FpjsProvider
      cacheLocation="memory"
      loadOptions={{
        apiKey: "jVDe77ago0K9w6LgIoyK",
      }}
    >
      <App />
    </FpjsProvider>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
