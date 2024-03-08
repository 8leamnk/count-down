import React from 'react';
import styled from 'styled-components';
import VALUE from '../../constants/value';

// style
const S = {};

S.Clock = styled.img.attrs(({ $disabled }) => {
  return {
    src: $disabled
      ? `${VALUE.public}/assets/images/clock-disabled.svg`
      : `${VALUE.public}/assets/images/clock.svg`,
    alt: 'clock',
  };
})``;

function ClockImage(props) {
  return <S.Clock {...props} />;
}

export default React.memo(ClockImage);
