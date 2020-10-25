const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

const templatesPath = './src/templates';

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogList = path.resolve(`${templatesPath}/BlogPostsPage.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create markdown pages
  const posts = result.data.allMarkdownRemark.edges;
  let blogPostsCount = 0;

  posts.forEach((post, index) => {
    const id = post.node.id;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `${templatesPath}/${String(post.node.frontmatter.template)}.js`,
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    });

    // Count blog posts.
    if (post.node.frontmatter.template === 'BlogPostPage') {
      blogPostsCount++;
    }
  });

  // Create blog-list pages
  const postsPerPage = 9;
  const pagesCount = Math.ceil(blogPostsCount / postsPerPage);

  Array.from({ length: pagesCount }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pagesCount,
        currentPage: i + 1,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
