import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';

import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';
import Provider from '../provider/Provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </CssBaseline>
  </React.StrictMode>,
)
