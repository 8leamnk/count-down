import React from 'react';
import styled from 'styled-components';

// style
const S = {};

S.Layout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Inner = styled.main`
  width: 416px;
`;

function MainLayout({ children }) {
  return (
    <S.Layout>
      <S.Inner>{children}</S.Inner>
    </S.Layout>
  );
}

export default React.memo(MainLayout);
