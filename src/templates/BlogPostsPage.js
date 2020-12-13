import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../modules/layout/Layout';
import BlogPosts from '../modules/blog-posts/BlogPosts';

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "BlogPostPage" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
            route
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`;

function BlogPostsPage(props) {
  return (
    <Layout>
      <BlogPosts {...props} />
    </Layout>
  );
}

export default BlogPostsPage;
