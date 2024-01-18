import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import BoxLayout from '../Layout/BoxLayout';
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

S.Timer = styled.strong`
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
const TENS_DIGIT = 10;
const NUMERIC_SPACE = '0';

function Time({ time }) {
  const disabled = useMemo(() => time === 0, [time]);

  const displayTime = (number) => {
    if (number >= TENS_DIGIT) {
      return number;
    }

    return `${NUMERIC_SPACE}${number}`;
  };

  const printTime = useCallback(() => {
    const totalTime = time / VALUE.msUnit;
    const minutes = Math.floor(totalTime / VALUE.timeUnit);
    const second = totalTime % VALUE.timeUnit;

    return `${displayTime(minutes)}:${displayTime(second)}`;
  }, [time]);

  return (
    <S.Wrapper>
      <BoxLayout {...OPTIONS}>
        <S.Clock $disabled={disabled} />
        <S.Timer $disabled={disabled}>{printTime()}</S.Timer>
      </BoxLayout>
    </S.Wrapper>
  );
}

export default React.memo(Time);
