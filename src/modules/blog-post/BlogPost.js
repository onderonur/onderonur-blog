import React from 'react';
import Img from 'gatsby-image';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import HtmlRenderer from '../shared/HtmlRenderer';
import ShareButtons from './ShareButtons';
import SEO from '../seo/SEO';
import { Bold } from '../shared/StyledUtils';
import BlogPostPagination from './BlogPostPagination';

const StyledArticle = styled.article`
  margin: 0 auto;
  max-width: 85ch;
`;

const FeaturedImage = styled(Img)`
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
`;

const BlogPostContent = styled(HtmlRenderer)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  text-align: justify;
  img {
    width: 100%;
  }
  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.primary.main};
  }
  > p {
    code {
      padding: ${({ theme }) => theme.spacing(0.2, 0.4)};
      background-color: ${({ theme }) => theme.palette.grey[300]};
    }
  }
`;

const ArticleHeader = styled.section`
  padding: ${({ theme }) => theme.spacing(4, 0, 1, 0)};
  text-align: center;
`;

function BlogPostShareButtons({ siteUrl }) {
  const location = useLocation();
  return (
    <Box display="flex" justifyContent="flex-end">
      <ShareButtons url={`${siteUrl}${location.pathname}`} />
    </Box>
  );
}

function BlogPost({ data, pageContext }) {
  const { markdownRemark, site } = data; // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt, fields } = markdownRemark;
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.fluid
    : '';
  const { previous, next } = pageContext;

  let props = {
    previous,
    next,
  };

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        imageSrc={Image.src}
        article={true}
      />
      <StyledArticle>
        <header>
          <ArticleHeader>
            <Typography component="h1" variant="h4">
              <Bold>{frontmatter.title}</Bold>
            </Typography>
            <Typography
              component="time"
              color="textSecondary"
              variant="subtitle2"
            >
              <time>{frontmatter.date}</time> · {fields.readingTime.text}
            </Typography>
          </ArticleHeader>
          <BlogPostShareButtons siteUrl={site.siteMetadata.siteUrl} />
          {Image && (
            <FeaturedImage
              fluid={Image}
              objectFit="cover"
              objectPosition="50% 50%"
              alt={`${frontmatter.title} - Featured image`}
            />
          )}
        </header>

        <BlogPostContent html={html} />

        <BlogPostShareButtons />
      </StyledArticle>
      {(previous ?? next) && <BlogPostPagination {...props} />}
    </>
  );
}

export default BlogPost;
