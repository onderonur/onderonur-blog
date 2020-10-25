import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header, { HeaderOffset } from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { Box, Container } from '@material-ui/core';

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
  }
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  position: relative;
`;

const Layout = ({ hero, children }) => {
  const { site } = useStaticQuery(query);
  const { siteTitle } = site.siteMetadata;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header siteTitle={siteTitle} />
      {hero}
      {!hero && <HeaderOffset />}
      <ContentContainer maxWidth="lg" component="main">
        {children}
      </ContentContainer>
      <Footer />
    </Box>
  );
};

export default Layout;
