import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
