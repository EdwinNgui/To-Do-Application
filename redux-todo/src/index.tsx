import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import "./index.css";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient(); //Init query client

//Regular index file, allows redux store to be accessed anywhere within the app
//Changed to check for an existing room element before rendering
if (rootElement !== null) {
  const appRoot = ReactDOM.createRoot(rootElement);
  appRoot.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  );
}
