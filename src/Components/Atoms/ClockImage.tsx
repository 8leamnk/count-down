import styled from 'styled-components';
import { PUBLIC_PATH } from '../../constants/global';

// style
const S = {
  Clock: styled.img.attrs<{ $disabled: boolean }>(() => {
    return {
      src: `${PUBLIC_PATH}/assets/images/clock.svg`,
      alt: 'clock',
    };
  })`
    width: 72px;
    opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  `,
};

interface ClockImageProps {
  disabled: boolean;
  [key: string]: unknown;
}

function ClockImage({ disabled, ...rest }: ClockImageProps) {
  return <S.Clock $disabled={disabled} {...rest} />;
}

export default ClockImage;
