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
