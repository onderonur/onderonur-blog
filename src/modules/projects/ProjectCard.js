import React from 'react';
import { Box, Card, CardActions, CardContent, Chip } from '@material-ui/core';
import styled from 'styled-components';
import BaseCardMedia from '../shared/BaseCardMedia';
import BaseCardTitle from '../shared/BaseCardTitle';
import BaseCardSubtitle from '../shared/BaseCardSubtitle';
import ExternalLinkButton from '../shared/ExternalLinkButton';

const StyledChip = styled(Chip)`
  margin: ${({ theme }) => theme.spacing(0.5)}px;
`;

const ProjectCard = ({ data }) => {
  return (
    <Card>
      <BaseCardMedia
        src={data.featuredImage?.childImageSharp.fluid}
        alt={`${data.title} - Featured image`}
      />
      <CardContent>
        <BaseCardTitle>{data.title}</BaseCardTitle>
        <BaseCardSubtitle>{data.description}</BaseCardSubtitle>
        <Box marginTop={1}>
          {data.techStack.map((tech) => {
            return (
              <StyledChip
                key={tech.name}
                label={tech.name}
                variant="outlined"
                color="primary"
                size="small"
              />
            );
          })}
        </Box>
      </CardContent>
      <CardActions>
        {data.sourceCodeUrl && (
          <ExternalLinkButton href={data.sourceCodeUrl}>
            Source Code
          </ExternalLinkButton>
        )}
        <Box flexGrow={1} />
        {data.demoUrl && (
          <ExternalLinkButton href={data.demoUrl}>Demo</ExternalLinkButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
