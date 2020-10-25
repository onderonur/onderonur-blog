import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade } from '@material-ui/core';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import styled from 'styled-components';
import slugify from 'slugify';
import { Bold } from './StyledUtils';

const scrollMarginTop = '5rem';

const StyledTypography = styled(Typography)`
  scroll-margin-top: ${scrollMarginTop};
`;

const SectionTitle = React.forwardRef(function SectionTitle(
  { children, ...rest },
  ref,
) {
  return (
    <StyledTypography
      ref={ref}
      {...rest}
      variant="h4"
      component="h2"
      gutterBottom
    >
      <Bold>{children}</Bold>
    </StyledTypography>
  );
});

const StyledAnchor = styled.a`
  color: inherit;
`;

const StyledFade = styled(Fade)`
  scroll-margin-top: ${scrollMarginTop};
`;

const Section = React.forwardRef(function Section({ title, children }, ref) {
  const [observedRef, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const [wasVisible, setWasVisible] = useState(isVisible);

  useEffect(() => {
    setWasVisible((current) => {
      if (!current && isVisible) {
        return true;
      }
      return current;
    });
  }, [isVisible]);

  const slug = slugify(title, { lower: true });

  return (
    <StyledFade
      ref={(node) => {
        observedRef(node);
        if (ref) {
          ref.current = node;
        }
      }}
      in={wasVisible}
      timeout={1000}
    >
      <Box marginTop={3} marginBottom={4}>
        <StyledAnchor href={`#${slug}`}>
          <SectionTitle id={slug}>{title}</SectionTitle>
        </StyledAnchor>
        {children}
      </Box>
    </StyledFade>
  );
});

export default Section;
