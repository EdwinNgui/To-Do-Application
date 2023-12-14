import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

const rootElement = document.getElementById("root");

//Regular index file, allows redux store to be accessed anywhere within the app
if (rootElement !== null) {
  const appRoot = ReactDOM.createRoot(rootElement);
  appRoot.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
