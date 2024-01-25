import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, MantineProvider } from '@mantine/core';
import {BrowserRouter} from 'react-router-dom'
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: '-apple-system, Consolas',
  fontFamilyMonospace: '-apple-system, Consolas',
  headings: { fontFamily: '-apple-system, Consolas' },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <MantineProvider theme={theme} defaultColorScheme='dark'>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MantineProvider>
    </React.StrictMode>
);
  
  