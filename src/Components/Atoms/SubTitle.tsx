import type { ChildrenProps } from '@/types/props';
import styled from 'styled-components';

// style
const S = {
  SubTitle: styled.h2`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.base}px;
    font-weight: 300;
  `,
};

interface SubTitleProps extends ChildrenProps {
  [key: string]: unknown;
}

function SubTitle({ children, ...rest }: SubTitleProps) {
  return <S.SubTitle {...rest}>{children}</S.SubTitle>;
}

export default SubTitle;
