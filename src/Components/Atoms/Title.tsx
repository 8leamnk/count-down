import styled from 'styled-components';
import type { ChildrenProps } from '../../types/props';

// style
const S = {
  Title: styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xLarge}px;
    font-weight: 700;
    letter-spacing: -0.8px;
  `,
};

interface TitleProps extends ChildrenProps {
  [key: string]: unknown;
}

function Title({ children, ...rest }: TitleProps) {
  return <S.Title {...rest}>{children}</S.Title>;
}

export default Title;
