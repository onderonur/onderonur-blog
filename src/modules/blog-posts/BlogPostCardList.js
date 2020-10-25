import React from 'react';
import GridCardList from '../shared/GridCardList';
import BlogPostCard from '../blog-posts/BlogPostCard';

function BlogPostCardList({ postEdges }) {
  return (
    <GridCardList
      data={postEdges}
      getItemKey={(edge) => edge.node.id}
      renderItem={(edge) => <BlogPostCard data={edge.node} />}
    />
  );
}

export default BlogPostCardList;
