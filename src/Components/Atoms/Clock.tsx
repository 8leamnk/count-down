import styled, { css } from 'styled-components';
import { mobile } from '../../style/mediaQuery';
import type { ChildrenProps } from '../../types/props';

// style
const S = {
  Clock: styled.time<{ $disabled: boolean }>`
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.gray005 : theme.colors.gray008};
    font-family: 'DS-Digital', sans-serif;
    font-size: ${({ theme }) => theme.fontSize.title}px;
    font-weight: 700;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;

    ${mobile(css`
      font-size: ${({ theme }) => theme.fontSize.largest}px;
    `)}
  `,
};

interface ClockProps extends ChildrenProps {
  disabled: boolean;
  [key: string]: unknown;
}

function Clock({ disabled, children, ...rest }: ClockProps) {
  return (
    <S.Clock $disabled={disabled} {...rest}>
      {children}
    </S.Clock>
  );
}

export default Clock;
