import React from "react";
import ReactDOM from "react-dom";
// --- 1. BrowserRouter ko yahan import karein ---
import { BrowserRouter } from "react-router-dom";
import App from "./main-component/App/App";
import reportWebVitals from "./reportWebVitals";
import "./css/font-awesome.min.css";
import "./css/themify-icons.css";
import "./css/flaticon.css";
import "./sass/style.scss";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* --- 2. Apne App component ko BrowserRouter se wrap karein --- */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// Optional: Web Vitals (unchanged)
reportWebVitals();
