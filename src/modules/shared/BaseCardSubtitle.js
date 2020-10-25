import { Typography } from '@material-ui/core';
import React from 'react';

function BaseCardSubtitle({ children }) {
  return (
    <Typography variant="subtitle2" color="textSecondary">
      {children}
    </Typography>
  );
}

export default BaseCardSubtitle;
