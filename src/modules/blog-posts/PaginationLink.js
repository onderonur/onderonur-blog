import React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import styled from 'styled-components';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import GatsbyLink from '../shared/GatsbyLink';

const Root = styled(MuiLink)`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isNextLink }) =>
    $isNextLink ? 'flex-end' : 'flex-start'};
  &:hover {
    text-decoration: none;
  }
`;

const PaginationLinkTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const PaginationLinkSubtitle = styled.div`
  margin: ${({ theme }) => theme.spacing(0, 1)};
`;

function PaginationLink({ to, subtitle, direction }) {
  const isNextLink = direction === 'next';
  return (
    <Root
      component={GatsbyLink}
      to={to}
      rel={isNextLink ? 'next' : 'prev'}
      $isNextLink={isNextLink}
    >
      <PaginationLinkTitle>
        {!isNextLink && <ArrowLeftIcon />}
        {isNextLink ? 'Next' : 'Previous'}
        {isNextLink && <ArrowRightIcon />}
      </PaginationLinkTitle>
      {subtitle && <PaginationLinkSubtitle>{subtitle}</PaginationLinkSubtitle>}
    </Root>
  );
}

export default PaginationLink;
