const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

const templatesPath = './src/templates';

function isNodeBlogPost(node) {
  return node.frontmatter.template === 'BlogPostPage';
}

function getNodeSlug({ node, getNode }) {
  const slug = createFilePath({ node, getNode });
  if (isNodeBlogPost(node)) {
    // We add the '/blog' prefix here for blog posts.
    return `/blog${slug}`;
  }
  return slug;
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogList = path.resolve(`${templatesPath}/BlogPostsPage.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              slug
              template
              title
            }
            fields {
              route
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
  const postEdges = result.data.allMarkdownRemark.edges;
  let blogPostsCount = 0;

  postEdges.forEach((post, index) => {
    const previous =
      index === postEdges.length - 1 ? null : postEdges[index + 1].node;
    const next = index === 0 ? null : postEdges[index - 1].node;

    const { route } = post.node.fields;

    createPage({
      path: route,
      component: path.resolve(
        `${templatesPath}/${String(post.node.frontmatter.template)}.js`,
      ),
      // additional data can be passed via context
      context: {
        route,
        previous,
        next,
      },
    });

    // Count blog posts.
    const isBlogPost = isNodeBlogPost(post.node);
    if (isBlogPost) {
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
    createNodeField({
      node,
      name: `route`,
      // We use node.fields.route for page paths too.
      // route is set as page path above `createPage` function calls.
      value: getNodeSlug({ node, getNode }),
    });
  }
};
