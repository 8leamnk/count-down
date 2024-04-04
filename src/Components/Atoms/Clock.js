import React from 'react';
import styled from 'styled-components';

// style
const S = {};

S.Clock = styled.time`
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.gray005 : theme.colors.gray008};
  font-family: 'DS-Digital', sans-serif;
  font-size: ${({ theme }) => `${theme.fontSize.title}px`};
  font-weight: 700;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

function Clock({ disabled, children, ...rest }) {
  return (
    <S.Clock $disabled={disabled} {...rest}>
      {children}
    </S.Clock>
  );
}

export default React.memo(Clock);
