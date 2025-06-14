import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';

import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';
import Provider from '../provider/Provider.jsx';
import { ThemeProvider } from './context/themeContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline>
      <Provider>
        <ThemeProvider>
          <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <RouterProvider router={router} />
        </div>
        </ThemeProvider>
      </Provider>
    </CssBaseline>
  </React.StrictMode>,
)
