import React, { useMemo } from 'react';
import styled from 'styled-components';
import useConvertToTime from '../../hooks/useConvertToTime';
import BoxLayout from '../Layout/BoxLayout';
import Clock from '../Atoms/Clock';
import ClockImage from '../Atoms/ClockImage';

// style
const S = {};

S.Wrapper = styled.section`
  margin: 16px 0;
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
        <ClockImage $disabled={disabled} />
        <Clock $disabled={disabled}>{convertToTime(time)}</Clock>
      </BoxLayout>
    </S.Wrapper>
  );
}

export default React.memo(Time);
