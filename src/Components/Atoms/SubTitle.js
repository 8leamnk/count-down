import React from 'react';
import styled from 'styled-components';

// style
const S = {};

S.SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  font-weight: 300;
`;

function SubTitle({ children, ...rest }) {
  return <S.SubTitle {...rest}>{children}</S.SubTitle>;
}

export default React.memo(SubTitle);
