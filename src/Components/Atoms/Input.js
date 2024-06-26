import styled, { css } from 'styled-components';

const S = {};

const placeholderStyle = css`
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  color: ${({ theme }) => `${theme.colors.gray003}`};
`;

S.Input = styled.input`
  width: 100%;
  height: 24px;
  font-family: 'Pretendard', sans-serif;
  color: ${({ theme }) => `${theme.colors.gray008}`};
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  font-weight: 400;
  line-height: 24px;
  box-sizing: border-box;

  &::placeholder {
    ${placeholderStyle}
  }

  &::-moz-placeholder {
    ${placeholderStyle}
  }

  &::-webkit-input-placeholder {
    ${placeholderStyle}
  }
`;

function Input({ ...rest }) {
  return <S.Input {...rest} />;
}

export default Input;
