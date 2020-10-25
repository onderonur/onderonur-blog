import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../modules/layout/Layout';
import styled, { css } from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HeaderOffset } from '../modules/layout/Header';
import BackgroundImage from 'gatsby-background-image';
import BlinkingTypist from '../modules/blinking-typist/BlinkingTypist';
import BaseButton from '../modules/shared/BaseButton';
import SEO from '../modules/seo/SEO';
import HtmlRenderer from '../modules/shared/HtmlRenderer';
import { Bold } from '../modules/shared/StyledUtils';
import ProjectCardList from '../modules/projects/ProjectCardList';
import Section from '../modules/shared/Section';
import LatestBlogPosts from '../modules/blog-posts/LatestBlogPosts';
import SkillsList from '../modules/skills/SkillsList';
import EducationTimeline from '../modules/education/EducationTimeline';
import ExperienceTimeline from '../modules/experience/ExperienceTimeline';
import SocialAccounts from '../modules/social-accounts/SocialAccounts';

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    heroImage: file(relativePath: { eq: "hero-image.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            fluid(
              maxWidth: 360
              maxHeight: 360
              quality: 80
              srcSetBreakpoints: [960, 1440]
            ) {
              ...GatsbyImageSharpFluid
            }
            sizes {
              src
            }
          }
        }
        skills {
          icon {
            childImageSharp {
              fixed(width: 30, height: 30, quality: 80, cropFocus: CENTER) {
                ...GatsbyImageSharpFixed
              }
              sizes {
                src
              }
            }
          }
          name
        }
        experience {
          dateRange
          jobTitle
          company
          description
          location
        }
        education {
          startYear
          endYear
          school
          fieldOfStudy
          grade
          location
        }
        projects {
          title
          description
          featuredImage {
            childImageSharp {
              fluid(quality: 80) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
          demoUrl
          sourceCodeUrl
          techStack {
            name
          }
        }
      }
    }
  }
`;

const HeroBgImage = styled(BackgroundImage)`
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
`;

const HeroBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;

const Tagline = styled(Typography)`
  opacity: 0.7;
`;

const SmoothImage = styled(Img)`
  border-radius: 50%;
  height: 12rem;
  width: 12rem;
  margin: auto;
  ${({ theme }) => {
    const breakpointValues = theme.breakpoints.values;
    return css`
      @media screen and (max-width: ${breakpointValues.lg}px) {
        height: 11rem;
        width: 11rem;
      }
      @media screen and (max-width: ${breakpointValues.md}px) {
        height: 10rem;
        width: 10rem;
      }
      @media screen and (max-width: ${breakpointValues.sm}px) {
        height: 9rem;
        width: 9rem;
      }
    `;
  }}
`;

const HeroBannerContent = styled.div`
  box-shadow: ${({ theme }) => theme.shadows[6]};
  padding: ${({ theme }) => theme.spacing(3)}px;
  position: relative;
  &:before {
    content: '';
    background: #ededed;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.9;
    z-index: -1;
  }
`;

const AboutSectionContent = styled(HtmlRenderer)`
  text-align: justify;
`;

const HomePage = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.fluid
    : undefined;

  const aboutRef = useRef(null);

  return (
    <>
      <SEO />
      <Layout
        hero={
          <HeroBgImage
            Tag="section"
            fluid={data.heroImage.childImageSharp.fluid}
          >
            <HeroBanner>
              <HeaderOffset />
              <HeroBannerContent>
                <SmoothImage
                  fluid={image}
                  alt={`${frontmatter.title} - Featured image`}
                />
                <Box marginTop={2}>
                  <Typography variant="h3" component="h1">
                    <Bold>{frontmatter.title}</Bold>
                  </Typography>
                  <Tagline
                    variant="h4"
                    component={BlinkingTypist}
                    startDelay={1000}
                  >
                    {frontmatter.tagline}
                  </Tagline>
                  <SocialAccounts />
                </Box>
                <Box marginY={2}>
                  <BaseButton
                    endIcon={<ExpandMoreIcon />}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      aboutRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Find Out More
                  </BaseButton>
                </Box>
              </HeroBannerContent>
            </HeroBanner>
          </HeroBgImage>
        }
      >
        <Section ref={aboutRef} title="About">
          <AboutSectionContent html={html} />
        </Section>
        <Section title="Skills">
          <SkillsList skills={frontmatter.skills} />
        </Section>
        <Section title="Experience">
          <ExperienceTimeline items={frontmatter.experience} />
        </Section>
        <Section title="Education">
          <EducationTimeline items={frontmatter.education} />
        </Section>
        <Section title="Projects">
          <ProjectCardList projects={frontmatter.projects} />
        </Section>
        <Section title="Latest in Blog">
          <LatestBlogPosts />
        </Section>
      </Layout>
    </>
  );
};

export default HomePage;
