import React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import styled from 'styled-components';
import SEO from '../seo/SEO';
import { Bold } from '../shared/StyledUtils';
import GridCardList from '../shared/GridCardList';
import Section from '../shared/Section';
import BlogPostCard from '../blog-posts/BlogPostCard';
import PaginationLink from './PaginationLink';
import GatsbyLink from '../shared/GatsbyLink';

const PaginationRoot = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: block;
  margin: ${({ theme }) => theme.spacing(3, 0)};
  text-align: center;
`;

const PaginationItem = styled.li`
  display: inline-block;
  margin: ${({ theme }) => theme.spacing(0, 1)};
  vertical-align: middle;
`;

const Pagination = ({
  blogSlug,
  currentPage,
  prevPage,
  isFirst,
  pagesCount,
  nextPage,
  isLast,
}) => {
  return (
    <PaginationRoot>
      {!isFirst && (
        <PaginationItem>
          <PaginationLink to={prevPage} direction="previous" />
        </PaginationItem>
      )}
      {Array.from({ length: pagesCount }, (_, i) => {
        const pageNumber = i + 1;
        const linkContent = pageNumber;
        return (
          <PaginationItem key={`pagination-number${pageNumber}`}>
            <MuiLink
              component={GatsbyLink}
              to={`${blogSlug}${i === 0 ? '' : pageNumber}`}
            >
              {currentPage === pageNumber ? (
                <Bold>{linkContent}</Bold>
              ) : (
                linkContent
              )}
            </MuiLink>
          </PaginationItem>
        );
      })}
      {!isLast && (
        <PaginationItem>
          <PaginationLink to={nextPage} direction="next" />
        </PaginationItem>
      )}
    </PaginationRoot>
  );
};

function BlogPosts({ data, pageContext }) {
  const { currentPage, pagesCount } = pageContext;
  const blogSlug = '/blog/';
  const isFirst = currentPage === 1;
  const isLast = currentPage === pagesCount;
  const prevPage =
    currentPage - 1 === 1 ? blogSlug : blogSlug + (currentPage - 1).toString();
  const nextPage = blogSlug + (currentPage + 1).toString();

  const paginationProps = {
    isFirst,
    prevPage,
    pagesCount,
    blogSlug,
    currentPage,
    isLast,
    nextPage,
  };
  const postEdges = data.allMarkdownRemark.edges.filter(
    (edge) => !!edge.node.frontmatter.date,
  );
  return (
    <>
      <SEO
        title={`Blog - Page ${currentPage} of ${pagesCount}`}
        description={`Onur Önder's blog page ${currentPage} of ${pagesCount}`}
      />
      <Section title="Blog">
        <GridCardList
          data={postEdges}
          getItemKey={(edge) => edge.node.id}
          renderItem={(edge) => <BlogPostCard data={edge.node} />}
        />
        <Pagination {...paginationProps} />
      </Section>
    </>
  );
}

export default BlogPosts;
