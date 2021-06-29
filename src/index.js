import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme.css';
import './assets/index.scss';
import {AuthProvider} from './store';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
