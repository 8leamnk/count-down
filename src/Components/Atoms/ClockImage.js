import styled from 'styled-components';
import VALUE from '../../constants/value';

// style
const S = {};

S.Clock = styled.img.attrs(() => {
  return {
    src: `${VALUE.public}/assets/images/clock.svg`,
    alt: 'clock',
  };
})`
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
`;

function ClockImage({ disabled, ...rest }) {
  return <S.Clock $disabled={disabled} {...rest} />;
}

export default ClockImage;
