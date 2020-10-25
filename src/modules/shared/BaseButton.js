import { Button } from '@material-ui/core';
import React from 'react';

function BaseButton(props) {
  return <Button {...props} disableElevation={true} />;
}

export default BaseButton;
