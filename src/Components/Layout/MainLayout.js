import styled from 'styled-components';

// style
const S = {};

S.Layout = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Inner = styled.section`
  width: 416px;
`;

function MainLayout({ children }) {
  return (
    <S.Layout>
      <S.Inner>{children}</S.Inner>
    </S.Layout>
  );
}

export default MainLayout;
