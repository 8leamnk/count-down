import styled from 'styled-components';

// style
const S = {};

S.Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xLarge}px;
  font-weight: 700;
  letter-spacing: -0.8px;
`;

function Title({ children, ...rest }) {
  return <S.Title {...rest}>{children}</S.Title>;
}

export default Title;
