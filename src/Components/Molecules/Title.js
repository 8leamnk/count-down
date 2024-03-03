import React from 'react';
import styled from 'styled-components';

// style
const S = {};

S.Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

S.Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => `${theme.fontSize.xLarge}px`};
  font-weight: 700;
  letter-spacing: -0.8px;
`;

S.SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  font-weight: 300;
  text-align: right;
`;

function Title() {
  return (
    <S.Wrapper>
      <S.Title>TIMER</S.Title>
      <S.SubTitle>
        COUNTDOWN
        <br />
        PROGRAM
      </S.SubTitle>
    </S.Wrapper>
  );
}

export default React.memo(Title);
