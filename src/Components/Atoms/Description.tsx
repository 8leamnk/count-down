import styled from 'styled-components';
import type { ChildrenProps } from '../../types/props';

// style
const S = {
  Description: styled.h2`
    font-family: 'Pretendard', sans-serif;
    color: ${({ theme }) => theme.colors.gray008};
    font-size: ${({ theme }) => theme.fontSize.base}px;
    font-weight: 400;
  `,
};

interface DescriptionProps extends ChildrenProps {
  [key: string]: unknown;
}

function Description({ children, ...rest }: DescriptionProps) {
  return <S.Description {...rest}>{children}</S.Description>;
}

export default Description;
