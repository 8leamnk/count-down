import React from 'react';
import styled, { css } from 'styled-components';
import { mobile } from '../../style/mediaQuery';
import Title from '../Atoms/Title';
import SubTitle from '../Atoms/SubTitle';

// style
const S = {};

S.Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;

  ${mobile(css`
    display: block;

    & > div {
      display: flex;
      gap: 8px;
      text-align: left;

      h2 {
        display: inline-block;
      }
    }
  `)}
`;

S.SubTitles = styled.div`
  text-align: right;
`;

function Subject({ title, subTitle }) {
  return (
    <S.Wrapper>
      <Title>{title}</Title>

      <S.SubTitles>
        {subTitle.split(/\\n/g).map((word) => (
          <SubTitle key={word}>{word}</SubTitle>
        ))}
      </S.SubTitles>
    </S.Wrapper>
  );
}

export default React.memo(Subject);
