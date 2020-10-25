import { Box } from '@material-ui/core';
import styled, { css } from 'styled-components';

const Stack = styled(Box)`
  display: flex;
  > *:not(:last-child) {
    ${({ flexDirection, theme, spacing }) => {
      const spacingInPx = theme.spacing(spacing);
      if (flexDirection === 'column') {
        return css`
          margin-bottom: ${spacingInPx}px;
        `;
      }
      return css`
        margin-right: ${spacingInPx}px;
      `;
    }};
  }
`;

export default Stack;
