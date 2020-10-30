/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
};

const settings = require('./src/util/site.json');

module.exports = {
  siteMetadata: settings.meta,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/`,
        name: `content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          netlifyCmsPaths,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              showCaptions: true,
              linkImagesToOriginal: false,
              tracedSVG: true,
              loading: 'lazy',
            },
          },
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            options: {
              zIndex: 9999,
            },
          },
          `gatsby-remark-responsive-iframe`,
          // Code highlighting
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              // https://www.gatsbyjs.com/plugins/gatsby-remark-vscode/#themes
              theme: 'Dark+ (default dark)', // Or install your favorite theme from GitHub
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: settings.ga,
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Onur Önder`,
        short_name: `Onur Önder`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `static/assets/onderonur.png`,
      },
    },
    'gatsby-plugin-offline',
    // For Material-UI
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    // For styled-components
    `gatsby-plugin-styled-components`,
  ],
};
