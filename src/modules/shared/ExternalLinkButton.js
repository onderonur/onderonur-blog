import React from 'react';
import BaseButton from './BaseButton';

const ExternalLinkButton = ({ href, children }) => {
  return (
    <BaseButton
      size="small"
      color="primary"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </BaseButton>
  );
};

export default ExternalLinkButton;
