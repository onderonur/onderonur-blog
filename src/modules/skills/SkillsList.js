import React from 'react';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import { Avatar, Box, Grid } from '@material-ui/core';

const skillAvatarStyle = {
  size: 30,
  marginRight: 1,
};

const skillAvatarBaseStyle = css`
  width: ${skillAvatarStyle.size}px;
  height: ${skillAvatarStyle.marginRight}px;
  margin-right: ${({ theme }) => theme.spacing(skillAvatarStyle.marginRight)}px;
`;

const SkillAvatar = styled(Avatar)`
  ${skillAvatarBaseStyle}
  background-color: transparent;
  border-radius: 0;
`;

const SkillAvatarOffset = styled.div`
  ${skillAvatarBaseStyle}
`;

const SkillsList = ({ skills }) => {
  return (
    <Grid container spacing={2}>
      {skills.map((skill) => {
        return (
          <Grid key={skill.name} item xs={12} sm={4} md={3} lg={2}>
            <Box display="flex" alignItems="center">
              {skill.icon ? (
                <SkillAvatar
                  component={Img}
                  fixed={skill.icon.childImageSharp.fixed}
                  alt={`${skill.name} - icon`}
                />
              ) : (
                <SkillAvatarOffset />
              )}
              {skill.name}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SkillsList;
