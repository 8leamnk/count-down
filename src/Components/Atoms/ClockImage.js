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

function ClockImage({ disabled, ...rest }) {
  return <S.Clock $disabled={disabled} {...rest} />;
}

export default ClockImage;
