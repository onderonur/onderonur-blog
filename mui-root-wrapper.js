import React from 'react';
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00a0c0',
    },
    secondary: {
      main: '#ee08d5',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // https://twitter.com/stackblitz/status/1321105526709755914
        html: {
          scrollBehavior: 'smooth',
        },
        ['@media (prefers-reduced-motion)']: {
          scrollBehavior: 'auto',
        },
        a: {
          textDecoration: 'none',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export const wrapRootElement = ({ element }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  </MuiThemeProvider>
);
