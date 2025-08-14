import type { ChildrenProps } from '@/types/props';
import styled, { css } from 'styled-components';
import mixin from '@/style/mixin';
import { mobile } from '@/style/mediaQuery';

// style
const S = {
  Layout: styled.main`
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
  `,

  Inner: styled.section`
    width: clamp(${mixin.minWidthLimit}px, 100%, 416px);
  `,
};

function MainLayout({ children }: ChildrenProps) {
  return (
    <S.Layout>
      <S.Inner>{children}</S.Inner>
    </S.Layout>
  );
}

export default MainLayout;
