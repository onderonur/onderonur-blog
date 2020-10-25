import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import SocialAccounts from '../social-accounts/SocialAccounts';

const initialYear = 2020;

const getYearRange = () => {
  const currentYear = new Date().getFullYear();
  if (currentYear === initialYear) {
    return 2020;
  }
  return `${initialYear} - ${currentYear}`;
};

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.palette.grey[200]};
  padding: ${({ theme }) => theme.spacing(1, 3)};
  z-index: 1;
`;

const Footer = () => (
  <StyledFooter>
    <Box flexGrow={1}>© {getYearRange()} All rights reserved</Box>
    <SocialAccounts />
  </StyledFooter>
);

export default Footer;
