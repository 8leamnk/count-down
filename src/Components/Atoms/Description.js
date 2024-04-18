import styled from 'styled-components';

// style
const S = {};

S.Description = styled.h2`
  font-family: 'Pretendard', sans-serif;
  color: ${({ theme }) => theme.colors.gray008};
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  font-weight: 400;
`;

function Description({ children, ...rest }) {
  return <S.Description {...rest}>{children}</S.Description>;
}

export default Description;
