import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './i18n/config';
import './i18n';
import Cookies from "js-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
Cookies.set("ISLng", "es");
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
