import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Box } from '@material-ui/core';
import BaseButton from '../shared/BaseButton';
import BlogPostCardList from './BlogPostCardList';
import GatsbyLink from '../shared/GatsbyLink';

function LatestBlogPosts() {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { template: { eq: "BlogPostPage" } } }
            limit: 6
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 250)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  slug
                  title
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                        ...GatsbyImageSharpFluid
                        ...GatsbyImageSharpFluidLimitPresentationSize
                      }
                    }
                  }
                }
                fields {
                  readingTime {
                    text
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const postEdges = data.allMarkdownRemark.edges.filter(
          (edge) => !!edge.node.frontmatter.date,
        );
        return (
          <section>
            <BlogPostCardList postEdges={postEdges} />
            <Box marginTop={3} display="flex" justifyContent="flex-end">
              <BaseButton
                component={GatsbyLink}
                to="/blog"
                color="primary"
                variant="outlined"
                endIcon={<ArrowRightIcon />}
              >
                See more
              </BaseButton>
            </Box>
          </section>
        );
      }}
    />
  );
}

export default LatestBlogPosts;
