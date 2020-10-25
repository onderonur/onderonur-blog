import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Layout from '../modules/layout/Layout';
import BaseButton from '../modules/shared/BaseButton';
import SEO from '../modules/seo/SEO';
import GatsbyLink from '../modules/shared/GatsbyLink';
import { Bold } from '../modules/shared/StyledUtils';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/HomeOutlined';

const PageContent = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function NotFound() {
  return (
    <Layout>
      <SEO title="Page not found" />
      <PageContent>
        <Box marginBottom={6}>
          <header>
            <Typography variant="h2" component="h1">
              <Bold>404 Not Found</Bold>
            </Typography>
            <Typography variant="h6" component="h3">
              The page you are looking for does not exist or is not accessible
              at the moment.
            </Typography>
          </header>
          <Box marginTop={2}>
            <BaseButton
              component={GatsbyLink}
              to="/"
              variant="outlined"
              color="primary"
              startIcon={<HomeIcon />}
            >
              Back to Homepage
            </BaseButton>
          </Box>
        </Box>
      </PageContent>
    </Layout>
  );
}

export default NotFound;
