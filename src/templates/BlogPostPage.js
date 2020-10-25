import React from 'react';
import BlogPost from '../modules/blog-post/BlogPost';
import Layout from '../modules/layout/Layout';
import { graphql } from 'gatsby';

function BlogPostPage(props) {
  return (
    <Layout>
      <BlogPost {...props} />
    </Layout>
  );
}

export default BlogPostPage;

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
          childImageSharp {
            fluid(
              maxWidth: 1980
              maxHeight: 768
              quality: 80
              srcSetBreakpoints: [350, 700, 1050, 1400]
            ) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
            sizes {
              src
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
`;
