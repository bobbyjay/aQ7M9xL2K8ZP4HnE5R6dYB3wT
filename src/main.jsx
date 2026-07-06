import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import App from './App.jsx';

import { MenuProvider } from './context/MenuContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </MenuProvider>
  </StrictMode>
);
