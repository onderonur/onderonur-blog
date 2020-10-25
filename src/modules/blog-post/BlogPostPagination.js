import React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import PaginationLink from '../blog-posts/PaginationLink';

function BlogPostPagination({ previous, next }) {
  return (
    <div>
      <Divider />
      <Box marginY={2}>
        <Grid container spacing={2}>
          {previous && previous.frontmatter.template === 'BlogPostPage' && (
            <Grid item xs={12} sm={6}>
              <PaginationLink
                direction="previous"
                to={previous.frontmatter.slug}
                subtitle={previous.frontmatter.title}
              />
            </Grid>
          )}
          {next && next.frontmatter.template === 'BlogPostPage' && (
            <Grid item xs={12} sm={6}>
              <PaginationLink
                direction="next"
                to={next.frontmatter.slug}
                subtitle={next.frontmatter.title}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default BlogPostPagination;
