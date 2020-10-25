import { AppBar, Box, Toolbar } from '@material-ui/core';
import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';

export const HeaderOffset = Toolbar;

const Header = ({ siteTitle }) => (
  <AppBar variant="outlined" position="fixed" color="inherit">
    <Toolbar>
      <Logo title={siteTitle} />
      <Box flexGrow={1} />
      <Navigation />
    </Toolbar>
  </AppBar>
);

export default Header;
