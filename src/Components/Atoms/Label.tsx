import type { ChildrenProps } from '@/types/props';
import styled from 'styled-components';

// style
const S = {
  Label: styled.label`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.base}px;
    font-weight: 400;
    letter-spacing: -0.4px;
  `,

  LabelText: styled.span`
    display: inline-block;
    margin-bottom: 4px;
  `,
};

interface LabelProps extends ChildrenProps {
  labelText: string;
  [key: string]: unknown;
}

function Label({ labelText, children, ...rest }: LabelProps) {
  return (
    <S.Label {...rest}>
      <S.LabelText>{labelText}</S.LabelText>
      {children}
    </S.Label>
  );
}

export default Label;
