import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import "./index.css"
import App from "./App.jsx"

// Set document title
document.title = "Upload Medicine Image"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <App />
  </React.StrictMode>,
)

