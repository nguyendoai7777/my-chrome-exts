import React from 'react';
import ReactDOM from 'react-dom/client';
import { NewTab } from './components/NewTab';
import './index.css';
import '../tailwind.config.css';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <NewTab />
  </React.StrictMode>,
);
