import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { IconButton } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import Stack from '../shared/Stack';

const query = graphql`
  query SocialAccountsQuery {
    site {
      siteMetadata {
        twitterUsername
        linkedinUsername
        githubUsername
        mail
      }
    }
  }
`;

function SocialAccountLink({ url, icon }) {
  if (!url) {
    return null;
  }

  const Icon = icon;

  return (
    <IconButton
      color="inherit"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </IconButton>
  );
}

function SocialAccounts() {
  const { site } = useStaticQuery(query);
  const { siteMetadata } = site;
  const {
    twitterUsername,
    githubUsername,
    linkedinUsername,
    mail,
  } = siteMetadata;

  return (
    <Stack spacing={0.5} flexDirection="row" justifyContent="center">
      <SocialAccountLink
        icon={TwitterIcon}
        url={`https://twitter.com/${twitterUsername}`}
      />
      <SocialAccountLink
        icon={GitHubIcon}
        url={`https://github.com/${githubUsername}`}
      />
      <SocialAccountLink
        icon={LinkedInIcon}
        url={`https://linkedin.com/in/${linkedinUsername}`}
      />
      <SocialAccountLink icon={MailIcon} url={`mailto:${mail}`} />
    </Stack>
  );
}

export default SocialAccounts;
