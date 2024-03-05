import React from 'react';
import styled from 'styled-components';
import Title from '../Atoms/Title';
import SubTitle from '../Atoms/SubTitle';

// style
const S = {};

S.Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
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
          <SubTitle key={word}>
            {word}
            <br />
          </SubTitle>
        ))}
      </S.SubTitles>
    </S.Wrapper>
  );
}

export default React.memo(Subject);
