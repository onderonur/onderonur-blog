import React from 'react';
import { Link } from 'gatsby';

const GatsbyLink = React.forwardRef(function GatsbyLink(
  { onClick, ...rest },
  ref,
) {
  return (
    <Link
      ref={ref}
      {...rest}
      onClick={(e) => {
        window.scrollTo({ top: 0 });
        onClick?.(e);
      }}
    />
  );
});

export default GatsbyLink;
