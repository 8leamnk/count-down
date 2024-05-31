import React from 'react';
import styled, { css } from 'styled-components';
import { mobile } from '../../style/mediaQuery';
import useConvertToTime from '../../hooks/useConvertToTime';
import BoxLayout from '../Layout/BoxLayout';
import Clock from '../Atoms/Clock';
import ClockImage from '../Atoms/ClockImage';

// style
const OPTIONS = Object.freeze({
  padding: { outer: 8, inner: 30 },
  radius: 20,
  height: 152,
});

const S = {};

S.Wrapper = styled.section`
  margin: 16px 0;

  ${mobile(css`
    #box-inner {
      padding: 0 ${OPTIONS.padding.inner / 2}px;
    }
  `)}
`;

function Time({ time }) {
  const { convertToTime } = useConvertToTime();
  const disabled = time === 0;

  return (
    <S.Wrapper>
      <BoxLayout {...OPTIONS}>
        <ClockImage disabled={disabled} />
        <Clock disabled={disabled}>{convertToTime(time)}</Clock>
      </BoxLayout>
    </S.Wrapper>
  );
}

export default React.memo(Time);
