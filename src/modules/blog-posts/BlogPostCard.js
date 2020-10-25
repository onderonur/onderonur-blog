import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import BaseCardMedia from '../shared/BaseCardMedia';
import BaseCardTitle from '../shared/BaseCardTitle';
import GatsbyLink from '../shared/GatsbyLink';

function BlogPostCard({ data }) {
  return (
    <GatsbyLink to={data.frontmatter.slug}>
      <Card>
        <CardActionArea>
          <BaseCardMedia
            src={data.frontmatter.featuredImage?.childImageSharp.fluid}
            alt={`${data.frontmatter.title} - Featured Image`}
          />
          <CardContent>
            <BaseCardTitle>{data.frontmatter.title}</BaseCardTitle>
            <Typography
              component="time"
              variant="subtitle2"
              color="textSecondary"
            >
              <time>{data.frontmatter.date}</time> ·{' '}
              {data.fields.readingTime.text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </GatsbyLink>
  );
}

export default BlogPostCard;
