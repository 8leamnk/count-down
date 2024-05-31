import styled, { css } from 'styled-components';
import { mobile } from '../../style/mediaQuery';

// style
const S = {};

S.Clock = styled.time`
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
`;

function Clock({ disabled, children, ...rest }) {
  return (
    <S.Clock $disabled={disabled} {...rest}>
      {children}
    </S.Clock>
  );
}

export default Clock;
