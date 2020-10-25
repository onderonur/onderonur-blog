const { default: styled } = require('styled-components');

export const Bold = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;
