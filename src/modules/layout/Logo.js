import React from 'react';
import { Typography } from '@material-ui/core';
import { Bold } from '../shared/StyledUtils';
import GatsbyLink from '../shared/GatsbyLink';

const Logo = ({ title }) => (
  <Typography component={GatsbyLink} to="/" color="primary">
    <Bold>{title}</Bold>
  </Typography>
);

export default Logo;
