import styled, { css, keyframes } from 'styled-components';
import { mobile } from '../../style/mediaQuery';
import mixin from '../../style/mixin';
import type { ChildrenProps } from '@/types/props';

// style
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const S = {
  Background: styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    animation: ${fadeIn} 0.15s;

    ${mobile(css`
      padding: 0 16px;
      box-sizing: border-box;
    `)}
  `,

  Inner: styled.div<{ $width: number }>`
    width: clamp(${mixin.minWidthLimit}px, 100%, ${({ $width }) => $width}px);
    display: flex;
    flex-direction: column;
    gap: 40px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: 3px 6px 9px 0 rgba(0, 0, 0, 0.16);
  `,
};

interface ModalLayoutProps extends ChildrenProps {
  popupWidth?: number;
  [key: string]: unknown;
}

function ModalLayout({
  popupWidth = 416,
  children,
  ...rest
}: ModalLayoutProps) {
  return (
    <S.Background {...rest}>
      <S.Inner $width={popupWidth} onClick={(e) => e.stopPropagation()}>
        {children}
      </S.Inner>
    </S.Background>
  );
}

export default ModalLayout;
