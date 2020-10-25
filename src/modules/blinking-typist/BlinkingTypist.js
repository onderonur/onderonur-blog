const { default: Typist } = require('react-typist');
const { default: styled } = require('styled-components');

// https://github.com/jstejada/react-typist/issues/74#issuecomment-523003006
const BlinkingTypist = styled(Typist)`
  &.Typist .Cursor {
    display: inline-block;
  }
  &.Typist .Cursor--blinking {
    opacity: 1;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default BlinkingTypist;
