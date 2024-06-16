import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter, BrowserRouter as Router} from "react-router-dom";
import { Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/LoginPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <Router> 
   <AuthProvider>
      <App/>
      </AuthProvider>
   </Router>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
