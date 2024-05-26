import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popup } from './components/panel/Popup';
import './index.css';
import '../tailwind.config.css';
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<Popup />);
