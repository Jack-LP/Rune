import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppWrapper } from './context/AppContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
