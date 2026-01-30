import React from "react";
import ReactDOM from "react-dom/client";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

//entry point of app
ReactDOM.createRoot(//create react root and render <App> in it
  document.getElementById('root')!//tells typescript i know this element exists
  ).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
