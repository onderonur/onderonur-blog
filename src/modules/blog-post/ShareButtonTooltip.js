import React from 'react';
import { Tooltip } from '@material-ui/core';

function ShareButtonTooltip({ name, children }) {
  const title = `Share on ${name}`;
  return (
    <Tooltip title={title} placement="top" arrow>
      {children}
    </Tooltip>
  );
}

export default ShareButtonTooltip;
