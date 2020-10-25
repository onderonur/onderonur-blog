import { Typography } from '@material-ui/core';
import React from 'react';

function HtmlRenderer({ html, ...rest }) {
  return (
    <Typography
      {...rest}
      dangerouslySetInnerHTML={{ __html: html }}
      component="div"
    />
  );
}

export default HtmlRenderer;
