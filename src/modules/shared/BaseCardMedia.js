import React from 'react';
import Img from 'gatsby-image';
import { Box, CardMedia } from '@material-ui/core';
import styled from 'styled-components';

const StyledCardMedia = styled(CardMedia)`
  height: 0;
  padding-bottom: 68%;
`;

const ImgOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.17);
`;

const BaseCardMedia = ({ src, alt }) => {
  if (!src) {
    return null;
  }

  return (
    <Box position="relative">
      <StyledCardMedia
        component={Img}
        fluid={src}
        objectFit="cover"
        objectPosition="50% 50%"
        alt={alt}
      />
      <ImgOverlay />
    </Box>
  );
};

export default BaseCardMedia;
