import React, { useMemo } from 'react';
import styled from 'styled-components';
import BoxLayout from '../Layout/BoxLayout';
import useConvertToTime from '../../hooks/useConvertToTime';
import VALUE from '../../constants/value';

// style
const S = {};

S.Wrapper = styled.section`
  margin: 16px 0;
`;

S.Clock = styled.img.attrs(({ $disabled }) => {
  return {
    src: $disabled
      ? `${VALUE.public}/assets/images/clock-disabled.svg`
      : `${VALUE.public}/assets/images/clock.svg`,
    alt: 'clock',
  };
})``;

S.Timer = styled.time`
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.gray005 : theme.colors.gray008};
  font-family: 'DS-Digital', sans-serif;
  font-size: ${({ theme }) => `${theme.fontSize.title}px`};
  font-weight: 700;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const OPTIONS = Object.freeze({
  padding: { outer: 8, inner: 30 },
  radius: 20,
  height: 152,
});

function Time({ time }) {
  const disabled = useMemo(() => time === 0, [time]);
  const { convertToTime } = useConvertToTime();

  return (
    <S.Wrapper>
      <BoxLayout {...OPTIONS}>
        <S.Clock $disabled={disabled} />
        <S.Timer $disabled={disabled}>{convertToTime(time)}</S.Timer>
      </BoxLayout>
    </S.Wrapper>
  );
}

export default React.memo(Time);
