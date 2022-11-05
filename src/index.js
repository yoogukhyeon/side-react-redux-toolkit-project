import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import store from './app/store';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
    <Router>
        <Provider store={store}>
            <App tab="home" />
        </Provider>
    </Router>
);


