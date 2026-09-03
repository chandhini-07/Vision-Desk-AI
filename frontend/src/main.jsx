import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#0f172a",
          color: "#ffffff",
          border: "1px solid #334155",
          borderRadius: "14px",
          padding: "14px 18px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />

  </React.StrictMode>
);