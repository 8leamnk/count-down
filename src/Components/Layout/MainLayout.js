import styled, { css } from 'styled-components';
import { mobile } from '../../style/mediaQuery';
import mixin from '../../style/mixin';

// style
const S = {};

S.Layout = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;

  ${mobile(css`
    height: 100%;
    display: block;
  `)}
`;

S.Inner = styled.section`
  width: clamp(${mixin.minWidthLimit}px, 100%, 416px);
`;

function MainLayout({ children }) {
  return (
    <S.Layout>
      <S.Inner>{children}</S.Inner>
    </S.Layout>
  );
}

export default MainLayout;
